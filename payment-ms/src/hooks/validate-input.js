// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { Unprocessable } = require('@feathersjs/errors');

// used to validate user input from the request
const validation = require('./validator');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    // initiate the validation class with data from the input as context.data
    // and validation rules as the hook options
    try {
      let validator = validation(context.app);
      await validator.validate(context.data, options);
    } catch (exp) {
      // if validation fails with the provided data and rules
      // then set the result of the request (i.e. the response) with
      // validation error message
      // and validation errors list
      throw new Unprocessable(exp.message, exp.errors);
    }
    return context;
  };
};
