const Builder = require("../../query-builder");

/* eslint-disable no-unused-vars */
exports.Recommendations = class Recommendations {
  constructor(options, app) {
    this.options = options || {};
    this.app = app;
  }

  async find(params) {
    let session = this.app.get("neo4j").session();
    let res = await session.run(
      `MATCH(s:User)-[:Friend*1..2]-()-[:Watched]->(videos:Video) WHERE s.id = "${params.query.user_id}" RETURN videos`
    );
    await session.close();
    return Builder.dataFilter(res.records);
  }

  async create(data) {
    let session = this.app.get("neo4j").session();
    let { id: u_id } = data.user;
    delete data.user.id;
    let { id: v_id } = data.video;
    delete data.video.id;

    // run merge query to store the data if not created before
    // with the generated string of the two users
    // and return the result of the query as the two users objects with properties
    let res = await session.run(
      `MERGE(u:User { id: "${u_id}"}) SET u += $user
       MERGE(v:Video { id: "${v_id}"}) SET v += $video
       MERGE(u)-[:Watched]->(v) RETURN v`,
      { user: data.user, video: data.video }
    );

    await session.close();
    // filter the result of the records as needed
    return Builder.dataFilter(res.records);
  }
};
