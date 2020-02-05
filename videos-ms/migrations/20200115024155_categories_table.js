exports.up = function (knex) {
  return knex.schema.hasTable('categories').then(exists => {
    if (!exists) {
      return knex.schema.createTable('categories', table => {
        table.increments('id');
        table.text('title').unique();
      });
    }

  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('categories');
};
