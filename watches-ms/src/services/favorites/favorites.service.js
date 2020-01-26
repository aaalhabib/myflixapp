// Initializes the `favorites` service on path `/api/watch-ms/favorites`
const { Favorites } = require("./favorites.class");
const Favorite = require("../../models/favorites.model");
const hooks = require("./favorites.hooks");

module.exports = function(app) {
  const options = {
    Model: Favorite,
    multi: true,
    paginate: app.get("paginate")
  };

  // Initialize our service with any options it requires
  app.use("/api/watches-ms/favorites", new Favorites(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("api/watches-ms/favorites");

  service.hooks(hooks);
};
