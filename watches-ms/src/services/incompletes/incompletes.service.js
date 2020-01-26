// Initializes the `incompletes` service on path `/api/watch-ms/incompletes`
const { Incompletes } = require("./incompletes.class");
const Incomplete = require("../../models/incompletes.model");
const hooks = require("./incompletes.hooks");

module.exports = function(app) {
  const options = {
    Model: Incomplete,
    multi: ["patch", "remove"],
    paginate: app.get("paginate")
  };

  // Initialize our service with any options it requires
  app.use("/api/watches-ms/incompletes", new Incompletes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("api/watches-ms/incompletes");

  service.hooks(hooks);
};
