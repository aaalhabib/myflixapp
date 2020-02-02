/** eslint-disable no-unused-vars */
const Builder = require("../../query-builder");

exports.Friends = class Friends {
  constructor(options, app) {
    this.options = options || {};
    this.app = app;
  }

  async find(params) {
    let session = this.app.get("neo4j").session();
    let res = await session.run(
      `MATCH(s:User)-[:Friend]-(friends:User) WHERE s.id = "${params.query.user_id}" RETURN friends`
    );
    await session.close();
    return Builder.dataFilter(res.records);
  }

  /**
   * the data accept array of users
   * and the array contains 2 objects of users information
   * @param data array
   * @param params object
   *
   * @return array of objects
   */
  async create(data) {
    let session = this.app.get("neo4j").session();
    let { id: u1_id } = data.users[0];
    delete data.users[0].id;
    let { id: u2_id } = data.users[1];
    delete data.users[1].id;

    // run merge query to store the data if not created before
    // with the generated string of the two users
    // and return the result of the query as the two users objects with properties
    let res = await session.run(
      `MERGE(s1:User { id: "${u1_id}"}) SET s1 += $user1
       MERGE(s2:User { id: "${u2_id}"}) SET s2 += $user2
       MERGE(s1)-[:Friend]->(s2) RETURN s2`,
      { user1: data.users[0], user2: data.users[1] }
    );

    await session.close();
    // filter the result of the records as needed
    return Builder.dataFilter(res.records);
  }

  async remove(id, params) {
    let session = this.app.get("neo4j").session();
    let query = `MATCH (s1:User {id: "${params.query.users[0]}"})-[r:Friend]-(s2:User {id: "${params.query.users[1]}"}) DELETE r`;
    await session.run(query);
    await session.close();
    return null;
  }
};
