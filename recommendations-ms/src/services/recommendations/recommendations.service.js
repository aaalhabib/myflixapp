// Initializes the `recommendations` service on path `/api/recommendations-ms/recommendations`
const { Recommendations } = require('./recommendations.class');
const hooks = require('./recommendations.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/api/recommendations-ms/recommendations', new Recommendations(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/recommendations-ms/recommendations');

  service.hooks(hooks);
};
