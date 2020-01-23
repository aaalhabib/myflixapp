// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require("objection");
const Video = require("./videos.model");

module.exports = function (app) {
  class Category extends Model {
    static tableName = "categories";
  
    static jsonSchema = {
      type: "object",
      required: ["title"],
  
      properties: {
        title: { type: "string" }
      }
    };
  
    static relationMappings = {
      videos: {
        relation: Model.HasManyRelation,
        modelClass: Video(app),
        join: {
          from: "categories.title",
          to: "videos.category"
        }
      }
    };
  
  }
    const db = app.get('knex');

  db.schema.hasTable('categories').then(exists => {
    if (!exists) {
      db.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        .createTable("categories", table => {
          table.increments("id");
          table.text("title").unique();
        })
      
        .then(() => console.log('Created categories table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating categories table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating categories table', e)); // eslint-disable-line no-console

  return Category;
};

