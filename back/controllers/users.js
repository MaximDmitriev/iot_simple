const express = require('express');

const { Definition } = require('../models/definitions');
const { User } = require('../models/user');
const { Table } = require('../models/tables');


const router = express.Router();

function getAllUsers(req, res) {
  const metadata = Table.findOne({tablename: 'users'}).populate('definition');
  const data = User.find({});

  Promise.all([metadata, data])
    .then(response => {
      const [metadata, data] = response;
      res.type('application/json');
      res.set('Access-Control-Allow-Origin', '*');
      res.json({metadata, data});
    })
    .catch(err => console.log(err));
}

router.get('/', getAllUsers);

router.get('/:id', (req, res) => {
  // console.log(req.params);
  User.findOne({_id: req.params.id})
    .then(data => {
      // console.log(data);
      res.type('application/json');
      res.set('Access-Control-Allow-Origin', '*');
      res.json(data);
    })
    .catch(err => console.log(err));
})


module.exports = router;