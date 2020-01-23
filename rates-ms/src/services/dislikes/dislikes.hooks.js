

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      context => {
        context.app
          .service('api/rates-ms/likes')
          .remove(null, {
            query: {
              user_id: context.data.user_id,
              video_id: context.data.video_id
            }
          })
          .catch(err => {});
        return context;
      }
    ],
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
