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


}

module.exports = Video;

