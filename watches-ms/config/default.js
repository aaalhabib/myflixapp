module.exports = {
  host: "localhost",
  port: 3034,
  public: "../public/",
  paginate: {
    default: 10,
    max: 50
  },
  postgres: {
    client: "pg",
    connection: process.env.DB_CON
  }
};
