const { Videos } = require('./videos.class');
const Video = require('../../models/videos.model');
const hooks = require('./videos.hooks');
const {
  attachementsUploader,
  attachementToBody
} = require('./upload-attachements');

module.exports = function(app) {
  const options = {
    Model: Video,
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use(
    '/api/videos-ms/videos',
    attachementsUploader,
    attachementToBody,
    new Videos(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service('api/videos-ms/videos');

  service.hooks(hooks);
};
