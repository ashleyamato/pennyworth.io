
exports.seed = function(knex, Promise) {
  return knex('pennyworkers').insert([
    {id: 1, first_name: 'Greg', last_name: 'Vallario'},
    {id: 2, first_name: 'Nate', last_name: 'Wearin'}
  ])
}
