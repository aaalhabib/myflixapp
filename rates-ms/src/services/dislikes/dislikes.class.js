const { Service } = require('feathers-objection');

exports.Dislikes = class Dislikes extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
