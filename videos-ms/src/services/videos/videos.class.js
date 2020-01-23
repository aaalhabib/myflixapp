const { Service } = require('feathers-objection');

exports.Videos = class Videos extends Service {
  constructor(options, app) {
    const { Model, ...otherOptions } = options;
    super({
      ...otherOptions,
      model: Model
    });
    this.app = app;
  }
};
