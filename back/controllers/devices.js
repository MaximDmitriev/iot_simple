const express = require('express');
const { Definition } = require('../models/definitions');
const { Devices } = require('../models/devices');
const { getAllRecords } = require('./utils');

const router = express.Router();

router.get('/', getAllRecords);
router.post('/create', (req, res) => {
  Devices.create(req.body)
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
  Devices.findOne({ _id: req.params.id })
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log(err));
});
router.delete('/delete', (req, res) => {
  Devices.findByIdAndDelete(req.body.id)
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log(err));
});

router.put('/update', (req, res) => {
  Devices.findByIdAndUpdate(req.body.id, req.body.fields)
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log(err));
});

module.exports = router;
