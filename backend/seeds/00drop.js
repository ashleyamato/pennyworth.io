
exports.seed = function(knex, Promise) {
  return knex('users_services').del()
    .then(() => knex('users').del())
    .then(() => knex('services').del())
    .then(() => knex('pennyworths').del())
}
