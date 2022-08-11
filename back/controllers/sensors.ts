import type { Request } from 'express';
import express from 'express';
import type { DeviceDto } from '../interfaces';
import { SensorData, Sensors } from '../models';
import { getAllRecords } from './utils';

// eslint-disable-next-line new-cap
export const router = express.Router();

/** Получение всех датчиков. */
router.get('/', getAllRecords);

/** Создание датчика. */
router.post('/create', (req: Request<never, DeviceDto, DeviceDto>, res) => {
  Sensors.create(req.body)
    .then(sensor => {
      res.json(sensor);
    })
    .catch(err => {
      console.log(err);
      res.status(400);
      res.json(err);
    });
});

/** Получение датчика по id. */
router.get('/:id', (req: Request<Pick<DeviceDto, 'id'>, string>, res) => {
  Sensors.findOne({ _id: req.params.id })
    .then(sensor => {
      void SensorData.find({ sensorId: sensor!.id })
        .sort({ datetime: -1 })
        .limit(1)
        .then(sensorData => {
          const value = sensorData.length > 0 ? sensorData[0].value : '';
          // @TODO из-за методов toJson/ toObject модели не получается нормальным образом добавить поле state в объект
          let body = JSON.stringify(sensor).slice(0, -1);

          body = body + `,"state":${value}}`;
          res.send(body);
        });
    })
    .catch(err => console.log(err));
});

/** Удаление записи о датчике. */
router.delete('/delete/:id', (req: Request<Pick<DeviceDto, 'id'>, DeviceDto | null>, res) => {
  Sensors.findByIdAndDelete(req.params.id)
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log(err));
});

/** Обновление данных о датчике. */
router.put('/update', (req: Request<never, DeviceDto | null, DeviceDto>, res) => {
  const { id } = req.body;
  const fields: Partial<DeviceDto> = { ...req.body };

  delete fields.id;

  Sensors.findByIdAndUpdate(id, fields)
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log(err));
});
