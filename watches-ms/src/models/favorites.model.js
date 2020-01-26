const { Model } = require("objection");

class Favorite extends Model {
  static tableName = "favorites";

  static jsonSchema = {
    type: "object",
    required: ["video_id", "user_id"],

    properties: {
      video_id: "string",
      user_id: "string"
    }
  };

  $beforeUpdate() {
    this.visited_at = new Date().toISOString();
  }
}

module.exports = Favorite;
