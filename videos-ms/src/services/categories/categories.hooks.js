

module.exports = {
  before: {
    all: [],
    find: [
      async context => {
        console.log(context.params.query);
        if (context.params.query.$homeCategories != undefined) {
          let Category = context.service.Model;
          try {
            // load the categories names . with related videos info
            context.result = await Category.query()
              .select('title')
              .eager('videos')
              .modifyEager('videos', builder => {
                builder
                  .select('id', 'title', 'poster_path')
                  .orderBy('created_at');
              })
              .whereExists(Category.relatedQuery('videos'));
            return context;
          } catch (err) {
            console.log(err);
            // Do something
          }
        }
        context.params.paginate = false;

        return context;
      }
    ],
    get: [],
    create: [],
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
