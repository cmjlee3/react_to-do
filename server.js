'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const logger  = require('morgan');
const homeRoute = require('./routes/index');
const taskRoute = require('./routes/tasks');

// this tests to see if we have NODE_ENV in our environment
// Only load the dotenv if we need it

const isDev = !('NODE_ENV' in process.env) && require('dotenv').config() && true;

const app = express();
const PORT = process.argv[2] || process.env.PORT || 3000;

app.listen(PORT);

app.use(logger(isDev ? 'dev' : 'common'));

// we're only going to accept json
app.use(bodyParser.json());

// bring in the task routes
// app.use('/tasks', require('./routes/tasks'));
app.use('/', homeRoute);
app.use('/', taskRoute);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something broke!');
});

// app.listen(PORT, () => console.log('Server is listening on', PORT));
