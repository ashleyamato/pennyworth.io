
exports.seed = function(knex, Promise) {
  return knex('users_services').insert([
    {id: 1, user_id: 1, service_id: 1, notes: 'Please pickup my clothes off the floor in my bedroom',
      date:'2018-03-28T08:30:27.745Z'},
    {id: 2, user_id: 1, service_id: 5, notes: 'Please pickup prescription at Walgreens on US-287',
      date:'2018-03-28T08:30:27.745Z'},
    {id: 3, user_id: 1, service_id: 3, notes: 'Package from Amazon should have arrived, please put on table',
      date:'2018-04-28T09:30:27.745Z'},
    {id: 4, user_id: 1, service_id: 4, notes: 'Pickup eggs, milk, whole wheat bread, bananas, yogurt',
      date:'2018-04-28T09:30:27.745Z'},
    {id: 5, user_id: 1, service_id: 7, notes: 'Walk dog around the block. Dog park down the street is also a good option',
      date:'2018-04-28T09:30:27.745Z'},
    {id: 6, user_id: 1, service_id: 8, notes: `Pack Sally's lunch: PB&J, milk box, banana`,
      date:'2018-04-28T09:30:27.745Z'},
    {id: 7, user_id: 1, service_id: 2, notes: `Wash dish towels and clothes in main bedroom hamper. Please fold.`,
      date:'2018-05-28T09:30:27.745Z'},
    {id: 8, user_id: 1, service_id: 6, notes: 'Dust living room and master bedroom. Clean downstairs bath.',
      date:'2018-05-28T09:30:27.745Z'},
    {id: 9, user_id: 2, service_id: 4, notes: 'Eggs, Milk, Whole Wheat Bread, Bananas',
      date:'2018-05-28T09:30:27.745Z'},
  ])
  .then(function(){
   return knex.raw("SELECT setval('users_services_id_seq', (SELECT MAX(id) FROM users_services))")
  })
}
