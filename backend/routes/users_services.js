'use strict';

const express = require('express')
const router = express.Router()
const knex = require('../knex')

router.get('/', (req, res, next) => {
  return knex('users')
  .then(users => {
    let promises = users.map(user => {
      return knex('services')
        .select('services.id', 'services.label')
        .join('users_services', 'services.id', 'users_services.service_id')
        .where('users_services.user_id', user.id)
        .select('users_services.notes', 'users_services.date', 'users_services.time')
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

router.patch('/:id', (req, res, next) => {
  let id =req.params.id
  let body = req.body
  console.log(req.body)
  return knex('users_services')
  .where('id', id)
  .update('notes', body.notes)
  .returning('*')
  .then((results) => {
    res.status(200).send(results[0])
  })
})

module.exports = router
