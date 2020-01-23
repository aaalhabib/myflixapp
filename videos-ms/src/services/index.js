const categories = require('./categories/categories.service.js');
const videos = require('./videos/videos.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(categories);
  app.configure(videos);
};
