exports.up = function(knex) {
  return knex.schema.createTable('categories', table => {
    table.increments('id');
    table.text('title').unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('categories');
};
