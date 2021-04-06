const express = require('express');
const { Definition } = require('../models/definitions');
const { Sensors } = require('../models/sensors');
const { getAllRecords, configResponse } = require('./utils');

const router = express.Router();

router.get('/', getAllRecords);
router.post('/create', (req, res) => {
  configResponse(res);
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
      configResponse(res);
      res.json(data);
    })
    .catch(err => console.log(err));
});
router.delete('/delete', (req, res) => {
  Sensors.findByIdAndDelete(req.body.id)
    .then(data => {
      configResponse(res);
      res.json(data);
    })
    .catch(err => console.log(err));
});

router.put('/update', (req, res) => {
  Sensors.findByIdAndUpdate(req.body.id, req.body.fields)
    .then(data => {
      configResponse(res);
      res.json(data);
    })
    .catch(err => console.log(err));
});

router.get('/esp', (req, res) => {
  console.log('esp', req.query);
  res.send('ESP');
});

router.post('/esp', (req, res) => {
  console.log(req.body);
  res.end();
});


module.exports = router;
