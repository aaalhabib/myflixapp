const cors = require('cors');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');

const services = require('./services');
const middleware = require('./middleware');


const objection = require('./objection');


const app = express(feathers());




// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// Load app configuration
app.configure(configuration());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.configure(objection);

// Set up Plugins and providers
app.configure(express.rest());


// Set up our services (see `services/index.js`)
app.configure(services);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

module.exports = app;

