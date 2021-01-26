const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const config = require('./config');

const users = require('./controllers/users');
const sensors = require('./controllers/sensors');


const app = express();

app.set('port', config.get('port'));

// app.use(favicon());
app.use(morgan('combined'));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.text({ type: 'text/html' }));
app.use(cookieParser());

app.use('/json/users', users);
app.use('/json/sensors', sensors);


app.listen(app.get('port'), () => {
  console.log('server started');
});
