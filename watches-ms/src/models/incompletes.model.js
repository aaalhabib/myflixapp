const { Model } = require("objection");

class Incomplete extends Model {
  static tableName = "incompletes";

  static jsonSchema = {
    type: "object",
    required: ["video_id", "user_id", "paused_at"],

    properties: {
      paused_at: "integer",
      video_id: "string",
      user_id: "string"
    }
  };
  $beforeUpdate() {
    this.visited_at = new Date().toISOString();
  }
}

module.exports = Incomplete;
