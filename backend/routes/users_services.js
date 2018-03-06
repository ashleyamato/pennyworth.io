'use strict';

const express = require('express')
const router = express.Router()
const knex = require('../knex')
//
// router.get('/', (req, res, next)=> {
//   return knex('services')
//   .then(services => {
//     let promises = services.map(service => {
//       return knex('users')
//         .select('users.id', 'users.first_name', 'users.last_name')
//         .join('users_services', 'users.id', 'users_services.user_id')
//         .where('users_services.user_id', service.id)
//         .then(users => {
//           service.users = users
//           return service
//         })
//         .catch((err) => {
//           next(err)
//         })
//     })
//     Promise.all(promises).then(results => {
//       res.status(200).json(results)
//     })
//   })
// })

router.get('/', (req, res, next)=> {
  return knex('users')
  .then(users => {
    let promises = users.map(user => {
      return knex('services')
        .select('services.id', 'services.label')
        .join('users_services', 'services.id', 'users_services.service_id')
        .where('users_services.user_id', user.id)
        .then(services => {
          user.services = services
          return user
        })
        .catch((err) => {
          next(err)
        })
    })
    Promise.all(promises).then(results => {
      res.status(200).json(results)
    })
  })
})



module.exports = router
