const express = require('express');
const { Definition } = require('../models/definitions');
const { Sensors } = require('../models/sensors');
const { Data } = require('../models/data');
const { getAllRecords } = require('./utils');

const router = express.Router();

router.get('/', getAllRecords);
router.post('/create', (req, res) => {
  Sensors.create(req.body)
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
  Sensors.findOne({ _id: req.params.id })
    .then(data => {
      Data.find({ sensorId: data.sensorId }).sort({ datetime: -1 }).limit(1)
        .then(sensor => {
          const value = sensor.length ? sensor[0].value : null;
          // @TODO из-за методов toJson/ toObject модели не получается нормальным образом добавить поле state в объект
          let body = JSON.stringify(data).slice(0, -1);
          body = body + `,"state":${value}}`;
          res.send(body);
        });
    })
    .catch(err => console.log(err));
});
router.delete('/delete', (req, res) => {
  Sensors.findByIdAndDelete(req.body.id)
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log(err));
});

router.put('/update', (req, res) => {
  Sensors.findByIdAndUpdate(req.body.id, req.body.fields)
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log(err));
});


module.exports = router;
