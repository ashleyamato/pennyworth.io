'use strict';

const express = require('express')
const router = express.Router()
const knex = require('../knex')
const admin = require('firebase-admin')

const dbURL = 'http://localhost:3001'
const serviceAccount = './config/pennyworth-cd634770f026.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: dbURL
})

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

router.get('/:id', (req, res, next) => {
  let token = req.params.id

  admin.auth().verifyIdToken(`${token}`)
    .then(decodedToken => {
      let uid = decodedToken.uid
      knex('users')
      .select('id', 'first_name', 'last_name', 'email', 'pennyworker_id', 'address')
      .where('token', uid)
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
          res.status(200).json(results[0])
        })
      })
    })
    .catch(error => console.log('error', error))
})

router.patch('/:id', (req, res, next) => {
  let id = req.params.id
  let body = req.body

  return knex('users_services')
    .where('id', id)
    .update('notes', body.notes)
    .returning('*')
    .then((results) => {
      res.status(200).send(results[0])
    })
})

router.post('/', (req, res, next) => {
  return knex('user_services')
    .insert({
      user_id:req.body.user_id,
      services_id:req.body.services_id,
      notes:req.body.notes,
      date:req.body.date,
      time:req.body.time
    }, '*')
    .then(data => {
      res.status(204).send({data})
    })
})

module.exports = router
