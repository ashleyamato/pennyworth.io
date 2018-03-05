
exports.seed = function(knex, Promise) {
    return knex('users').insert([
      {id: 1, first_name: 'Ashley', last_name: 'Amato', email: 'ashleyamato1@gmail.com',
        token: '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
        pennyworth_id: 1, address: '1111 Bear Mountain Dr, Boulder, CO, 80303'},
      {id: 2, first_name: 'Olivia', last_name: 'Burgener', email: 'livburgener@gmail.com',
        token: '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
        pennyworth_id: 2, address: '2222 Chiron Street , Lafayette, CO, 80026'},
      {id: 3, first_name: 'Eddie', last_name: 'Marovich', email: 'eddiemarovich@gmail.com',
        token: '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
        pennyworth_id: 2, address: '1111 Lovin It Lane, Boulder, CO, 80303'}
    ])
  .then(function(){
   return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))")
  })
}
