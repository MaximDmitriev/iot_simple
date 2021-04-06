const express = require('express');

const { Definition } = require('../models/definitions');
const { User } = require('../models/user');
const { getAllRecords, configResponse } = require('./utils');


const router = express.Router();

router.get('/', getAllRecords);

router.post('/create', (req, res) => {
  configResponse(res);
  User.create(req.body)
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
  User.findOne({ _id: req.params.id })
    .then(data => {
      configResponse(res);
      res.json(data);
    })
    .catch(err => console.log(err));
});

router.delete('/delete', (req, res) => {
  User.findByIdAndDelete(req.body.id)
    .then(data => {
      configResponse(res);
      res.json(data);
    })
    .catch(err => console.log(err));
});

router.put('/update', (req, res) => {
  User.findByIdAndUpdate(req.body.id, req.body.fields)
    .then(data => {
      configResponse(res);
      res.json(data);
    })
    .catch(err => console.log(err));
});


module.exports = router;
