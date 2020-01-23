// Update with your config settings.
module.exports = {
  development: {
    client: "postgresql",
    connection: process.env.DB_CON,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: process.env.DB_CON,

    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "migrations"
    }
  }
};
