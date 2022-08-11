import type { Request } from 'express';
import express from 'express';
import type { BoardDto } from '../interfaces';
import { Boards } from '../models';
import { getAllRecords } from './utils';

// eslint-disable-next-line new-cap
export const router = express.Router();

/** Получение всех плат. */
router.get('/', getAllRecords);

/** Создание платы. */
router.post('/create', (req: Request<never, BoardDto, BoardDto>, res) => {
  Boards.create(req.body)
    .then(board => {
      res.json(board);
    })
    .catch(err => {
      console.log(err);
      res.status(400);
      res.json(err);
    });
});

/** Получение устройства по id. */
router.get('/:id', (req: Request<Pick<BoardDto, 'id'>, BoardDto | null>, res) => {
  Boards.findOne({ _id: req.params.id })
    .then(board => {
      res.json(board);
    })
    .catch(err => console.log(err));
});

/** Удаление устройства по id. */
router.delete('/delete/:id', (req: Request<Pick<BoardDto, 'id'>, BoardDto | null>, res) => {
  Boards.findByIdAndDelete(req.params.id)
    .then(board => {
      res.json(board);
    })
    .catch(err => console.log(err));
});

/** Обновление записи об устройстве. */
router.put('/update', (req: Request<never, BoardDto | null, BoardDto>, res) => {
  const { id } = req.body;
  const fields: Partial<BoardDto> = { ...req.body };

  delete fields.id;
  Boards.findByIdAndUpdate(id, fields)
    .then(board => {
      res.json(board);
    })
    .catch(err => console.log(err));
});
