exports.up = function(knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('favorites', table => {
      table.increments();
      table.uuid('video_id').notNullable();
      table.uuid('user_id').notNullable();
      table.timestamp('visited_at').defaultTo(knex.raw('now()'));
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('favorites');
};
