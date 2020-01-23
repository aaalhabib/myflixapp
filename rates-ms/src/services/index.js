const likes = require('./likes/likes.service.js');
const dislikes = require('./dislikes/dislikes.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(likes);
  app.configure(dislikes);
};
