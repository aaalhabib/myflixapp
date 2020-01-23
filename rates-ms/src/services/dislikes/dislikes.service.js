// Initializes the `dislikes` service on path `/api/rates-ms/dislikes`
const { Dislikes } = require('./dislikes.class');
const createModel = require('../../models/dislikes.model');
const hooks = require('./dislikes.hooks');

module.exports = function (app) {
  const options = {
    multi: true,
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/api/rates-ms/dislikes', new Dislikes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/rates-ms/dislikes');

  service.hooks(hooks);
};
