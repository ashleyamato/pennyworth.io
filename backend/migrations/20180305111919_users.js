

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id')
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.string('email').notNullable()
    table.string('token').notNullable()
    table.integer('pennyworker_id')
    table.foreign('pennyworker_id').references('pennyworkers.id').onDelete('CASCADE')
    table.string('address').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
