import type { Request } from 'express';
import express from 'express';
import type { DeviceDto } from '../interfaces';
import { SensorData, Relays } from '../models';
import { getAllRecords } from './utils';

// eslint-disable-next-line new-cap
export const router = express.Router();

/** Получение всех реле. */
router.get('/', getAllRecords);

/** Создание нового реле. */
router.post('/create', (req: Request<never, DeviceDto, DeviceDto>, res) => {
  Relays.create(req.body)
    .then(relay => {
      res.json(relay);
    })
    .catch(err => {
      console.log(err);
      res.status(400);
      res.json(err);
    });
});

/** Получение данных о реле по id. */
router.get('/:id', (req: Request<Pick<DeviceDto, 'id'>, string>, res) => {
  Relays.findOne({ _id: req.params.id })
    .then(relay => {
      void SensorData.find({ sensorId: relay!.id })
        .sort({ datetime: -1 })
        .limit(1)
        .then(sensor => {
          const value = sensor.length > 0 ? sensor[0].value : '';
          // @TODO из-за методов toJson/ toObject модели не получается нормальным образом добавить поле state в объект
          let body = JSON.stringify(relay).slice(0, -1);

          body = body + `,"state":${value}}`;
          res.send(body);
        });
    })
    .catch(err => console.log(err));
});

/** Удаление реле. */
router.delete('/delete/:id', (req: Request<Pick<DeviceDto, 'id'>, DeviceDto | null>, res) => {
  Relays.findByIdAndDelete(req.params.id)
    .then(relay => {
      res.json(relay);
    })
    .catch(err => console.log(err));
});

/** Обновление данных по реле. */
router.put('/update', (req: Request<never, DeviceDto | null, DeviceDto>, res) => {
  const { id } = req.body;
  const fields: Partial<DeviceDto> = { ...req.body };

  delete fields.id;

  Relays.findByIdAndUpdate(id, fields)
    .then(relay => {
      res.json(relay);
    })
    .catch(err => console.log(err));
});
