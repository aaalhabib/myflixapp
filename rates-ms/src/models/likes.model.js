const { Model } = require('objection');

class Like extends Model {
  static get tableName(){
    return 'likes';
  } 

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['video_id', 'user_id'],

      properties: {
        video_id: 'string',
        user_id: 'string'
      }
    };
  }
}

module.exports = function (app) {
  const db = app.get('knex');

  db.schema.hasTable('likes').then(exists => {
    if (!exists) {
      //db.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
      db.schema.createTable('likes', table => {
        table.increments();
        table.uuid('video_id').notNullable();
        table.uuid('user_id').notNullable();
      })
        .then(() => console.log('Created likes table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating likes table', e)); // eslint-disable-line no-console
    }
  }).catch(err => console.log(err));
  return Like;
  
};
