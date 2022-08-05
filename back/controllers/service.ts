// @ts-nocheck
import express from 'express';
import { Data, Relays, Sensors, Devices } from '../models';
import { Config } from '../config/config.ts';
import { switchRelay } from '../mqtt';
import { mqttEmitter } from '../mqtt/controllers';

export const router = express.Router();
const { separators } = Config;

/** возвращает датчики и исполнительные механизмы, непривязанные к устройствам */
router.get('/get_free_sensors', (req, res) => {
  const sensors = Sensors.find({ clusterId: { $in: [undefined, ''] } });
  const relays = Relays.find({ clusterId: { $in: [undefined, ''] } });
  Promise.all([sensors, relays])
    .then(doc => {
      const data = [...doc[0], ...doc[1]].map(s => `${s.sensorname} (${s.sensorId})${separators.pair}${s.sensorId}`);
      res.send(JSON.stringify(data));
    })
    .catch(err => console.log(err));
});

/**
 * переопределяет clusterId у датчиков в зависимости от того,
 * привязаны они к устройству или нет на clusterId/undefined соответственно
 */
router.post('/set_cluster_sensors', (req, res) => {
  // @TODO оптимизировать апдейты, возможно через pre() post()
  Devices.findOne({ clusterId: req.body.cluster }).then(doc => {
    const ids = doc.content ? doc.content.map(id => id.split(separators.pair)[1]) : [];
    const index2delete = ids.filter(id => !req.body.ids.includes(id));
    if (index2delete.length) {
      Sensors.updateMany({ sensorId: { $in: index2delete } }, { clusterId: undefined }, (err, result) => {
        console.log(result);
      });
      Relays.updateMany({ sensorId: { $in: index2delete } }, { clusterId: undefined }, (err, result) => {
        console.log(result);
      });
    }
    Sensors.updateMany({ sensorId: { $in: req.body.ids } }, { clusterId: req.body.cluster }, (err, result) => {
      console.log(result);
    });
    Relays.updateMany({ sensorId: { $in: req.body.ids } }, { clusterId: req.body.cluster }, (err, result) => {
      console.log(result);
    });
    res.send(JSON.stringify(index2delete));
  });
});

/**
 * возвращает данные датчиков или группы датчиков (устройства), последнюю запись или набор записей
 * в заисимости от запроса
 * body: {
 *   id - sensorId/clusterId (required)
 *   type - sensor/cluster (required)
 *   paging: {
 *     start,
 *     count,
 *   }
 *   filter: {
 *     fromDate,
 *     toDate,
 *   }
 * }
 */
router.post('/get_sensor_data', (req, res) => {
  if (!req.body.type || !req.body.id) {
    res.status(400);
    res.send({ message: 'Некорректный запрос данных' });
  }
  if (req.body.type === 'sensor') {
    Data.find({ sensorId: req.body.id })
      .sort({ datetime: -1 })
      .limit(1)
      .then(data => res.send(JSON.stringify(data)))
      .catch(error => {
        res.status(500);
        res.send(JSON.stringify({ message: 'Ошибка БД', error }));
      });
  }
  if (req.body.type === 'cluster') {
    Devices.findOne({ clusterId: req.body.id }, (error, device) => {
      if (error) {
        res.status(500);
        res.send(JSON.stringify({ message: 'Ошибка БД', error }));
      }
      Data.find({ clusterId: req.body.id })
        .sort({ datetime: -1 })
        .limit(device.content.length)
        .then(data => res.send(JSON.stringify(data)))
        .catch(error => {
          res.status(500);
          res.send(JSON.stringify({ message: 'Ошибка БД', error }));
        });
    });
  }
});

router.post('/switch', (req, res) => {
  if (req.body.id && (req.body.state || req.body.state === 0)) {
    switchRelay(req.body.id, req.body.state);
    mqttEmitter.once('clusterUpdated', data => {
      res.status(200);
      res.send(JSON.stringify({ ...data, message: 'Устройство переключено' }));
    });
  } else {
    res.status(405);
    res.send(JSON.stringify({ message: 'Не указан id механизма или его статус' }));
  }
});
