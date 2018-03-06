
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_services', table => {
    table.increments('id')
    table.integer('user_id').notNullable()
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
    table.integer('service_id').notNullable()
    table.foreign('service_id').references('services.id').onDelete('CASCADE')
    table.string('notes', 10000).notNullable()
    table.string('date').notNullable()
    table.string('time').notNullable()
    table.timestamps(true, true)

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_services')
};
