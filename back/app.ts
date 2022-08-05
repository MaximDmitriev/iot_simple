// @ts-nocheck
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import * as mqtt from './mqtt';

import { users, login, devices, loginedUsers, sensors, relays, services } from './controllers';

function checkAuthToken(token) {
  // accepted refresh unauthorized
  if (token && !Array.isArray(token) && token !== 'undefined') {
    const res = jwt.decode(token, { json: true });
    if (res && res.name) {
      // const user = loginedUsers[res.name] || await User.findOne({ name: res.name });
      console.log(loginedUsers[res.name]);
    }
    return 'accepted';
  } else {
    return 'unauthorized';
  }
}
const app = express();

app.set('port', 3001);

mongoose
  .connect('mongodb://localhost:27017/iot_db', { dbName: 'iot_db' })
  .then(() => console.log('mongo connected'))
  .catch(err => console.error(err));

app.use(cors());

const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  // res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(allowCrossDomain);

app.use(bodyParser.json({ type: 'application/json' }));

app.use((req, res, next) => {
  if (req.url.indexOf('login') !== -1) {
    next();
  } else {
    const status = checkAuthToken(req.headers['x-auth']);
    if (status === 'accepted') {
      next();
    } else if ('refresh') {
      res.status(406).send();
    } else {
      res.status(401).json(JSON.stringify({ message: 'Требуется авторизация' }));
    }
  }
});

app.use('/json/login', login);
app.use('/json/users', users);
app.use('/json/sensors', sensors);
app.use('/json/relays', relays);
app.use('/json/devices', devices);
app.use('/json/service', services);

app.listen(3001, () => {
  console.log('server started');
});
