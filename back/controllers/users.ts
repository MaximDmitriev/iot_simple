import express from 'express';
import { User } from '../models';

import { getAllRecords } from './utils';

// eslint-disable-next-line new-cap
export const router = express.Router();

router.get('/', getAllRecords);

router.post('/create', (req, res) => {
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
      res.json(data);
    })
    .catch(err => console.log(err));
});

router.delete('/delete', (req, res) => {
  User.findByIdAndDelete(req.body.id)
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log(err));
});

router.put('/update', (req, res) => {
  User.findByIdAndUpdate(req.body.id, req.body.fields)
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log(err));
});
