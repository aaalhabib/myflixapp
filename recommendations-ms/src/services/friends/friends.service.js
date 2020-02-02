// Initializes the `friends` service on path `/api/recommendations-ms/friends`
const { Friends } = require("./friends.class");
const hooks = require("./friends.hooks");

module.exports = function(app) {
  const options = {
    paginate: app.get("paginate"),
    multi: ["remove"]
  };

  // Initialize our service with any options it requires
  app.use("/api/recommendations-ms/friends", new Friends(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("api/recommendations-ms/friends");

  service.hooks(hooks);
};
