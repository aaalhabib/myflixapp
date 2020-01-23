const cors = require('cors');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');


const middleware = require('./middleware');
const services = require('./services');


const objection = require('./objection');


const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing

app.use(cors());
app.use(
  express.json({
    limit: '210mb'
  })
);
app.use(
  express.urlencoded({
    limit: '210mb',
    extended: true
  })
);
app.use('/', express.static(app.get('public')));
// Set up Plugins and providers
app.configure(express.rest());


app.configure(objection);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// Set up our services (see `services/index.js`)
app.configure(services);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

module.exports = app;
