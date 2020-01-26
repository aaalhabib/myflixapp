const { Service } = require('feathers-objection');

exports.Incompletes = class Incompletes extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
