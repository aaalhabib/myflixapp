// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class Video extends Model {
  static get tableName() {
    return 'videos';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'title',
        'category',
        'poster_path',
        'file_path',
        'description',
        'publish_ts'
      ],

      properties: {
        title: { type: 'string' },
        category: { type: 'string' },
        poster_path: { type: 'string' },
        file_path: { type: 'string' },
        description: { type: 'string' },
        publish_ts: { type: 'string' }
      }
    };
  }

//  $beforeUpdate() {
//    this.updated_at = new Date().toISOString();
//  }
}


module.exports = function (app) {
  const db = app.get('knex');

  db.schema.hasTable('videos').then(exists => {
    if (!exists) {
      db.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        .createTable('videos', table => {
          table.uuid('id').unique().primary().notNullable().defaultTo(db.raw('uuid_generate_v4()'));
          table.text('title').unique().notNullable();
          table.text('category').notNullable();
          table.text('description').notNullable();
          table.timestamp('publish_ts').notNullable();
          table.text('poster_path').notNullable();
          table.text('file_path').notNullable();

          table.timestamp('created_at').defaultTo(db.raw('now()'));
          table.timestamp('updated_at').defaultTo(db.raw('now()'));
        })
        .then(() => console.log('Created videos table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating videos table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating videos table', e)); // eslint-disable-line no-console

  return Video;
};

