import type { Request } from 'express';
import express from 'express';
import type { UserDto } from '../interfaces';
import { User } from '../models';
import { getAllRecords } from './utils';

// eslint-disable-next-line new-cap
export const router = express.Router();

/** Получение всех пользователей. */
router.get('/', getAllRecords);

/** Создание пользователя. */
router.post('/create', (req: Request<never, UserDto, UserDto>, res) => {
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

/** Получение пользователя по id. */
router.get('/:id', (req: Request<{ id: Pick<UserDto, 'id'> }, UserDto | null>, res) => {
  User.findOne({ _id: req.params.id })
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log(err));
});

/** Удаление пользователя. */
router.delete('/delete/:id', (req: Request<{ id: Pick<UserDto, 'id'> }, UserDto | null>, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log(err));
});

/** Обновление пользователя. */
router.put('/update', (req: Request<never, UserDto | null, UserDto>, res) => {
  const { id } = req.body;
  const fields: Partial<UserDto> = { ...req.body };

  delete fields.id;

  User.findByIdAndUpdate(id, fields)
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log(err));
});
