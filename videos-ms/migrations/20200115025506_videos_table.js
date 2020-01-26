exports.up = function(knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('videos', table => {
      table
        .uuid('id')
        .unique()
        .primary()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table
        .text('title')
        .unique()
        .notNullable();
      table.text('category').notNullable();
      table.text('description').notNullable();
      table.timestamp('publish_ts').notNullable();

      table.text('poster_path').notNullable();
      table.text('file_path').notNullable();

      table.timestamp('created_at').defaultTo(knex.raw('now()'));
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('videos');
};
