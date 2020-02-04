const neo4j = require("neo4j-driver");

module.exports = async function(app) {
  const driver = await neo4j.driver(
    process.env.GDB_CON,
    neo4j.auth.basic(process.env.GDB_USER, process.env.GDB_PASS)
  );

  app.set("neo4j", driver);
  const session = driver.session();
  await session.run('CREATE CONSTRAINT ON (n:User) ASSERT n.id IS UNIQUE;');
  await session.close();  
};
