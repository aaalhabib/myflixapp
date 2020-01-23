const { Service } = require('feathers-objection');

exports.Categories = class Categories extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
