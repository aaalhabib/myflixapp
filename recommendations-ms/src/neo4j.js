const neo4j = require("neo4j-driver");

module.exports = function(app) {
  const driver = neo4j.driver(
    process.env.GDB_CON,
    neo4j.auth.basic(process.env.GDB_USER, process.env.GDB_PASS)
  );

  app.set("neo4j", driver);
};
