import express from 'express';
import { Boards } from '../models';
import { getAllRecords } from './utils';

// eslint-disable-next-line new-cap
export const router = express.Router();

router.get('/', getAllRecords);

router.post('/create', (req, res) => {
  Boards.create(req.body)
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
  Boards.findOne({ _id: req.params.id })
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log(err));
});

router.delete('/delete', (req, res) => {
  Boards.findByIdAndDelete(req.body.id)
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log(err));
});

router.put('/update', (req, res) => {
  Boards.findByIdAndUpdate(req.body.id, req.body.fields)
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log(err));
});
