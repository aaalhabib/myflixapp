module.exports = class Builder {
  /**
   * filter results from the neo4j response
   */
  static dataFilter(info) {
    let data = [];
    for (let i = 0; i < info.length; i++) {
      let fields = info[i]._fields;
      for (let j = 0; j < fields.length; j++) {
        data.push(fields[j].properties);
      }
    }
    return data;
  }
};
