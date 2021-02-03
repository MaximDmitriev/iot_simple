const express = require('express');

const { Definition } = require('../models/definitions');
const { User } = require('../models/user');
const { Table } = require('../models/tables');


const router = express.Router();

const configResponse = (response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', '*');
  response.set('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authortization');
  response.type('application/json');
}

function getAllUsers(req, res) {
  const metadata = Table.findOne({tablename: 'users'}).populate('definition');
  const data = User.find({});

  Promise.all([metadata, data])
    .then(response => {
      const [metadata, data] = response;
      configResponse(res);
      res.json({metadata, data});
    })
    .catch(err => console.log(err));
}

router.get('/', getAllUsers);

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
})

router.get('/:id', (req, res) => {
  User.findOne({_id: req.params.id})
    .then(data => {
      configResponse(res);
      res.json(data);
    })
    .catch(err => console.log(err));
})


module.exports = router;