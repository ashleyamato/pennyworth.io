exports.up = function(knex, Promise) {
  return knex.schema.createTable('services', table => {
    table.increments('id')
    table.string('label').notNullable()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('services')
}
