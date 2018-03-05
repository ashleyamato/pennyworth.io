
exports.seed = function(knex, Promise) {
    return knex('services').insert([
      {id: 1, label: 'Tidy-up'},
      {id: 2, label: 'Laundry & Clothes'},
      {id: 3, label: 'Packages & Mail'},
      {id: 4, label: 'Grocery Shopping'},
      {id: 5, label: 'Pickup Prescription'}
    ])
  .then(function(){
   return knex.raw("SELECT setval('services_id_seq', (SELECT MAX(id) FROM services))")
  })
}
