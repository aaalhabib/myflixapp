const setAttachementsInfo = require('../../hooks/set-attachements-info');

module.exports = {
  before: {
    all: [
      context => {
        context.params.paginate = false;
        return context;
      }
    ],
    find: [],
    get: [],
    create: [setAttachementsInfo()],
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
