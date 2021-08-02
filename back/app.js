const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const config = require('./config');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('./lib/mongoose');
const { authCache } = require('./services/cache');
require('./mqtt/index');

const users = require('./controllers/users');
const sensors = require('./controllers/sensors');
const relays = require('./controllers/relays');
const devices = require('./controllers/devices');
const service = require('./controllers/service');
const login = require('./controllers/login');


const app = express();

app.set('port', config.get('port'));

app.use(morgan('combined'));
app.use(cookieParser());
app.use(bodyParser.json({ type: 'application/json' }));

app.use(session({
  secret: config.get('session:secret'),
  key: config.get('session:key'),
  name: 'cid',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 2000000,
    domain: '.app.localhost',
    path: '/',
    sameSite: 'None',
  },
  store: MongoStore.create({
    client: mongoose.connection.getClient(),
    ttl: 24 * 60 * 60,
  }),
}));

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Credentials', 'true');
  res.set('Access-Control-Allow-Headers', config.get('headers'));
  res.set('Access-Control-Allow-Methods', config.get('methods'));
  res.set('Access-Control-Allow-Origin', config.get('frontend'));
  next();
});
app.use((req, res, next) => {
  if (req.method === 'OPTIONS' || req.path.includes('login')) {
    next();
  } else {
    if (authCache.isSessionExisted(req.headers['x-auth'])) {
      next();
    } else {
      res.status(401);
      res.json(JSON.stringify({ message: 'Требуется авторизация' }));
    }
  }
});

app.use('/json/login', login);
app.use('/json/users', users);
app.use('/json/sensors', sensors);
app.use('/json/relays', relays);
app.use('/json/devices', devices);
app.use('/json/service', service);


app.listen(app.get('port'), () => {
  console.log('server started');
});
