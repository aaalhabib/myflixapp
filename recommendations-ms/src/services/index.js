const friends = require('./friends/friends.service.js');
const recommendations = require('./recommendations/recommendations.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(friends);
  app.configure(recommendations);
};
