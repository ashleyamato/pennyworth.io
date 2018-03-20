exports.up = function(knex, Promise) {
  return knex.schema.createTable('custom_services', table => {
    table.increments('id')
    table.integer('user_id').notNullable()
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
    table.string('label').notNullable()
    table.string('notes', 10000).notNullable()
    table.string('date').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('custom_services')
}
