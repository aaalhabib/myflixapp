const favorites = require('./favorites/favorites.service.js');
const incompletes = require('./incompletes/incompletes.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(favorites);
  app.configure(incompletes);
};
