import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../settings';

// eslint-disable-next-line new-cap
export const router = express.Router();

const errorMessage = 'Неверное имя или пароль';

const currentUser = {
  username: '',
  set name(val) {
    this.username = val;
  },
  get name() {
    return this.username;
  },
};

export const loginedUsers = {};

/** Создание токена. */
const generateAccessToken = (username: string) => jwt.sign({ name: username }, ACCESS_TOKEN_SECRET, { expiresIn: 60 * 60 * 2 });
// return jwt.sign({ name: username }, ACCESS_TOKEN_SECRET);

router.post('/', (req, res) => {
  void (async () => {
    if (!req.body.login || !req.body.password) {
      return res.status(405).json({
        messages: [
          {
            msg: 'Заполните поля "Логин" и "Пароль"',
            type: 'error',
          },
        ],
      });
    }

    const user = await User.findOne({ name: req.body.login });

    if (!user) {
      return res.status(401).json({
        messages: [
          {
            msg: errorMessage,
            type: 'error',
          },
        ],
      });
    }

    if (await bcrypt.compare(req.body.password, user.hashedPassword)) {
      const username = req.body.login;
      const accessToken = generateAccessToken(username);
      const refreshToken = jwt.sign({ name: username }, REFRESH_TOKEN_SECRET);

      loginedUsers[req.body.name] = { accessToken, refreshToken };
      void User.findOneAndUpdate({ name: req.body.login }, { refreshToken });
      currentUser.name = username;
      res.status(200).json({
        messages: [
          {
            msg: 'Вход подтвержден',
            type: 'success',
          },
        ],
        auth: { accessToken, refreshToken },
      });
    } else {
      return res.status(401).json({
        messages: [
          {
            msg: 'Неверный логин или пароль',
            type: 'error',
          },
        ],
      });
    }
  })();
});
