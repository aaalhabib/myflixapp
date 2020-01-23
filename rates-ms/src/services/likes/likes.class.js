const { Service } = require('feathers-objection');

exports.Likes = class Likes extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
