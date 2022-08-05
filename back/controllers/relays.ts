import express from 'express';
import { Data, Relays } from '../models';
import { getAllRecords } from './utils';

export const router = express.Router();

router.get('/', getAllRecords);
router.post('/create', (req, res) => {
  Relays.create(req.body)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(400);
      res.json(err);
    });
});

router.get('/:id', (req, res) => {
  Relays.findOne({ _id: req.params.id })
    .then(data => {
      Data.find({ sensorId: data.sensorId })
        .sort({ datetime: -1 })
        .limit(1)
        .then(sensor => {
          const value = sensor.length > 0 ? sensor[0].value : null;
          // @TODO из-за методов toJson/ toObject модели не получается нормальным образом добавить поле state в объект
          let body = JSON.stringify(data).slice(0, -1);

          body = body + `,"state":${value}}`;
          res.send(body);
        });
    })
    .catch(err => console.log(err));
});
router.delete('/delete', (req, res) => {
  Relays.findByIdAndDelete(req.body.id)
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log(err));
});

router.put('/update', (req, res) => {
  Relays.findByIdAndUpdate(req.body.id, req.body.fields)
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log(err));
});
