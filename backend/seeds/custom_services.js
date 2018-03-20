
exports.seed = function(knex, Promise) {
  return knex('custom_services').insert([
    {id: 1, user_id: 1, label:'Wax Floors',
    notes:'Please wax kitchen floors', date:'2018-03-28T10:30:27.745Z'}
  ])
  .then(function(){
   return knex.raw("SELECT setval('custom_services_id_seq', (SELECT MAX(id) FROM custom_services))")
  })
}
