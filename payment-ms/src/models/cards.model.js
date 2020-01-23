// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class Card extends Model {
  static get tableName() {
    return 'cards';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['number', 'expiry_year', 'expiry_month', 'cvc'],

      properties: {
        number: { type: 'string' },
        expiry_year: { type: 'integer' },
        expiry_month: { type: 'integer' },
        cvc: { type: 'integer' }
      }
    };
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}

module.exports = function (app) {
  const db = app.get('knex'); 

  db.schema.hasTable('cards').then(exists => {
    if (!exists) {
      db.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        .createTable('cards', table => {
          table.uuid('id').unique().primary().notNullable().defaultTo(db.raw('uuid_generate_v4()'));
          table.uuid('user_id').notNullable();
          table.text('number').unique();
          table.integer('expiry_year').notNullable();
          table.integer('expiry_month').notNullable();
          table.text('cvc').notNullable();
          table.timestamp('subscription_expiry_date').notNullable();
      
          table.timestamp('created_at').defaultTo(db.raw('now()'));
          table.timestamp('updated_at').defaultTo(db.raw('now()'));
      
        })
        .then(() => console.log('Created cards table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating cards table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating cards table', e)); // eslint-disable-line no-console

  return Card;
};
