// used to validate user input from the request
const Validator = require('validatorjs');

// make callback with app argument to fetch app instance to interact with the db
module.exports = function(app) {
  Validator.registerAsync('unique', async function(value, args, field, passes) {
    const knex = app.get('knex');
    // if there is additional field to the table argument or use it as first arg
    args = args.includes(',') ? args.split(',') : [args];
    let message = `${field} has already been taken.`;
    try {
      let result = await knex
        .table(args[0])
        .where(field, value)
        .count();
      // the result is returned as array contains the object .
      // inside it there is count property in string form
      if (result[0].count == '0') {
        return passes();
      }
      // if count is not 0 return false
      return passes(false, message);
    } catch (exp) {
      // if any exception happend return false too
      return passes(false, message);
    }
  });
  // return validation object contains the validate function to use with async and await
  return {
    validate(data, rules) {
      // promisify the callback api of the package
      return new Promise((resolve, reject) => {
        // call the validation class
        const validator = new Validator(data, rules);
        // prepare validation error callback
        // contains the error message
        // and the validation errors
        const handleFails = () =>
          reject({
            message: 'validation error',
            errors: validator.errors.all()
          });
        // Asynchronous handler (with callbacks)
        if (validator.hasAsync) {
          validator.passes(() => resolve());
          validator.fails(() => handleFails());
        } else {
          // Synchronous handler
          if (validator.passes()) {
            resolve();
          } else {
            handleFails();
          }
        }
      });
    }
  };
};
