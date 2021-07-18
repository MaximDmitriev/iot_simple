const express = require('express');
const { User } = require('../models/user');

const router = express.Router();
const errorMessage = 'Неверное имя или пароль';

router.post('/', (req, res) => {
  User
    .findOne({ login: req.body.login })
    .then(user => {
      if (user.checkPassword(req.body.password)) {
        req.session.user = user.id;
        res.send({
          username: user.username,
          login: user.login,
          role: user.role,
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

module.exports = router;
