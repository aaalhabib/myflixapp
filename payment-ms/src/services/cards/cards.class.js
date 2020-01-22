const { Service } = require('feathers-objection');

exports.Cards = class Cards extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
