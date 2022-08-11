import type { Request, Response } from 'express';
import express from 'express';
import type { DeviceDto, SensorDataDto } from '../interfaces';
import { SensorData, Relays, Sensors, Boards } from '../models';
import { switchRelay } from '../mqtt-client';
import { mqttEmitter } from '../mqtt-client/controllers';

// eslint-disable-next-line new-cap
export const router = express.Router();

/** Возвращает датчики и исполнительные механизмы, непривязанные к устройствам. */
router.get('/get_free_sensors', (_, res: Response<DeviceDto[]>) => {
  const sensors = Sensors.find({ clusterId: { $in: [undefined, ''] } });
  const relays = Relays.find({ clusterId: { $in: [undefined, ''] } });

  Promise.all([sensors, relays])
    .then(doc => {
      const data = [...doc[0], ...doc[1]];

      res.json(data);
    })
    .catch(err => console.log(err));
});

/**
 * Переопределяет clusterId у датчиков в зависимости от того,
 * привязаны они к устройству или нет на clusterId/undefined соответственно.
 */
router.post('/set_cluster_sensors', (req: Request<never, number[], { cluster: number; ids: number[] }>, res) => {
  // @TODO оптимизировать апдейты, возможно через pre() post()
  void Boards.findOne({ clusterId: req.body.cluster }).then(board => {
    const ids = board?.components ? board.components.map((id: number) => id) : [];
    const index2delete = ids.filter((id: number) => !req.body.ids.includes(id));

    if (index2delete.length > 0) {
      void Sensors.updateMany({ sensorId: { $in: index2delete } }, { clusterId: undefined }, (_, result) => {
        console.log(result);
      });
      void Relays.updateMany({ sensorId: { $in: index2delete } }, { clusterId: undefined }, (_, result) => {
        console.log(result);
      });
    }

    void Sensors.updateMany({ sensorId: { $in: req.body.ids } }, { clusterId: req.body.cluster }, (_, result) => {
      console.log(result);
    });
    void Relays.updateMany({ sensorId: { $in: req.body.ids } }, { clusterId: req.body.cluster }, (_, result) => {
      console.log(result);
    });
    res.json(index2delete);
  });
});

/**
 * Возвращает данные датчиков
 * body: {
 * id - sensorId/clusterId (required)
 * paging: { start, count },
 * filter: { fromDate, toDate },
 * }.
 */
router.post('/get_sensor_data', (req: Request<never, SensorDataDto[], { id: number; paging: { count: number } }>, res) => {
  const count = req.body.paging?.count ?? 1;

  SensorData.find({ sensorId: req.body.id })
    .sort({ datetime: -1 })
    .limit(count)
    .then(sensorData => res.json(sensorData))
    .catch(() => {
      res.status(500);
      res.json([]);
    });
});

/**
 * Возвращает данные датчиков одного кластера
 * body: {
 * id - sensorId/clusterId (required)
 * paging: { start, count },
 * filter: { fromDate, toDate },
 * }.
 */
router.post('/get_sensor_cluster_data', (req: Request<never, SensorDataDto[], { id: number; paging: { count: number } }>, res) => {
  const count = req.body.paging?.count ?? 1;

  void Boards.findOne({ clusterId: req.body.id }, (error, device) => {
    if (error) {
      res.status(500);
      res.json([]);
    }

    SensorData.find({ clusterId: req.body.id })
      .sort({ datetime: -1 })
      .limit(device.content.length * count)
      .then(sensorData => res.json(sensorData))
      .catch(() => {
        res.status(500);
        res.json([]);
      });
  });
});

/** Переключение реле в заданное состояние. */
router.get('/switch/:id/:state', (req: Request<{ id: number; state: 0 | 1 }, string>, res) => {
  if (!req.params.id) {
    res.status(405);
    res.send(JSON.stringify({ message: 'Не указан id механизма или его статус' }));
  }

  const state = req.params.state || 0;

  switchRelay(req.params.id, state);

  mqttEmitter.once('clusterUpdated', data => {
    res.status(200);
    res.send(JSON.stringify({ ...data, message: 'Устройство переключено' }));
  });
});
