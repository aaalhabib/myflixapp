const moment = require('moment');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    context.data.subscription_expiry_date = moment()
      .add(1, 'month')
      .toISOString();
    return context;
  };
};