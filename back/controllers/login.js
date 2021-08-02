const express = require('express');
const { User } = require('../models/user');
const { authCache } = require('../services/cache');

const router = express.Router();
const errorMessage = 'Неверное имя или пароль';

router.post('/', (req, res) => {
  User
    .findOne({ login: req.body.login })
    .then(user => {
      if (user.checkPassword(req.body.password)) {
        req.session.user = user.id;
        const userData = {
          username: user.username,
          login: user.login,
          role: user.role,
        };
        authCache.createUser({ user: userData, token: req.session.id });
        res.send({
          ...userData,
          token: req.session.id,
        });
      } else {
        res.status(403);
        res.json(JSON.stringify({ message: errorMessage }));
      }
    })
    .catch(err => {
      res.status(403);
      res.json(JSON.stringify({ message: errorMessage, err }));
    });
});

router.post('/out', (req, res) => {
  authCache.deleteUser();
  res.status(200);
  res.json({});
});

module.exports = router;
