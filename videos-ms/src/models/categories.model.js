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
        modelClass: Video,
        join: {
          from: "categories.title",
          to: "videos.category"
        }
      }
    };
  
  }
  return Category;
};

