'use strict';

const express = require('express')
const router = express.Router()
const knex = require('../knex')
const admin = require('firebase-admin')


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
          return knex('custom_services')
            .select('services.id', 'services.label')
            .join('users_services', 'services.id', 'users_services.service_id')
            .where('users_services.user_id', user.id)
            .select('users_services.notes', 'users_services.date')
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
