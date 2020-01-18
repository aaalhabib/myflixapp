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
      required: ['password','name', 'email','security_question','security_answer'],

      properties: {
      
        password: 'string',
        name: 'string',
        email: 'string',
        security_question:'string',
        security_answe: 'string',
      
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
        table.uuid("id").primary().notNullable().defaultTo(db.raw('uuid_generate_v4()'))
        table.text("name");
        table.text("email").unique();
        table.text("password").notNullable();
        table.text("security_question");
        table.text("security_answer");
  
        table.timestamp("created_at").defaultTo(db.raw('now()'));
        table.timestamp("updated_at").defaultTo(db.raw('now()'));
  
      })
      .then(()=>console.log('users created'))
      .catch(err => console.log(err)) 
    }
  })
    .catch(e => console.error('Error creating users table', e)); // eslint-disable-line no-console

  return users;
};
