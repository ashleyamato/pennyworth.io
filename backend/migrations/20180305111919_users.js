

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id')
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.string('email').notNullable()
    table.string('token').notNullable()
    table.integer('pennyworth_id').notNullable()
    table.foreign('pennyworth_id').references('pennyworths.id').onDelete('CASCADE')
    table.string('address').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
