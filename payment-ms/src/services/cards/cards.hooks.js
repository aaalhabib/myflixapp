
const validate = require('../../hooks/validate-input');

const prepareCardsInfo = require('../../hooks/prepare-cards-info');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [validate({
      number: 'required|string|unique:cards',
      expiry_year: 'required|numeric|digits:4',
      expiry_month: 'required|numeric|digits_between:1,2',
      cvc: 'required|numeric|digits:3'
    }),
    prepareCardsInfo()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
