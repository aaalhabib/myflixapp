// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class users extends Model {

  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['password','name', 'email'],

      properties: {
      
        password: 'string',
        name: 'string',
        email: 'string',
      
      }
    };
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}

module.exports = function (app) {
  const db = app.get('knex');

  db.schema.hasTable('users').then(exists => {
    if (!exists) {
      db.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
      .createTable("users", table => {
            table.uuid("id").primary().notNullable().defaultTo(knex.raw('uuid_generate_v4()'))
            table.text("name");
            table.text("email").unique();
            table.text("password").notNullable();
            table.text("security_question");
            table.text("security_answer");
      
            table.timestamp("created_at").defaultTo(knex.raw('now()'));
            table.timestamp("updated_at").defaultTo(knex.raw('now()'));
      
          }); 
      }
  })
    .catch(e => console.error('Error creating users table', e)); // eslint-disable-line no-console

  return users;
};
