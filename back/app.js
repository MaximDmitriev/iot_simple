const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const config = require('./config');
const cors = require('cors');
require('./mqtt/index');

const users = require('./controllers/users');
const sensors = require('./controllers/sensors');
const relays = require('./controllers/relays');
const devices = require('./controllers/devices');
const service = require('./controllers/service');


const app = express();

app.set('port', config.get('port'));
app.use(cors());

// app.use(favicon());
app.use(morgan('combined'));
// app.use(bodyParser.text({ type: 'text/html' }));
// app.use(cookieParser());
app.use(bodyParser.json({ type: 'application/json' }));

app.use('/json/users', users);
app.use('/json/sensors', sensors);
app.use('/json/relays', relays);
app.use('/json/devices', devices);
app.use('/json/service', service);


app.listen(app.get('port'), () => {
  console.log('server started');
});
