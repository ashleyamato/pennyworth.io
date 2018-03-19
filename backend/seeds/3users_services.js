
exports.seed = function(knex, Promise) {
  return knex('users_services').insert([
    {id: 1, user_id: 1, service_id: 1, notes: 'Please pickup my clothes off the floor in my bedroom',
      date:'2018-03-28T10:30:27.745Z', time:'10:00AM'},
    {id: 2, user_id: 1, service_id: 3, notes: 'Package from Amazon should have arrived, please put on table',
      date:'2018-03-28T10:30:27.745Z', time:'10:00AM'},
    {id: 3, user_id: 2, service_id: 4, notes: 'Eggs, Milk, Whole Wheat Bread, Bananas',
      date:'2018-03-28T10:30:27.745Z', time:'09:00AM'},
    {id: 4, user_id: 3, service_id: 5, notes: 'Please pickup prescription at Walgreens on US-287',
      date:'2018-03-28T10:30:27.745Z', time:'09:00AM'}
  ])
  .then(function(){
   return knex.raw("SELECT setval('users_services_id_seq', (SELECT MAX(id) FROM users_services))")
  })
}
