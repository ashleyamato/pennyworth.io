'use strict';

const express = require('express')
const router = express.Router()
const knex = require('../knex')
const admin = require('firebase-admin')

const dbURL = 'http://localhost:3001' // or database url
const serviceAccount = './config/pennyworth-cd634770f026.json' // get this file from firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: dbURL
})

router.get('/', (req, res, next) => {
   return knex('users')
  .select('*')
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.status(404).send(err)
  })
})


router.get('/:id', (req, res, next) => {
  let token = req.params.id

  admin.auth().verifyIdToken(`${token}`)
    .then(decodedToken => {
      console.log('you are logged in >>>', decodedToken)
    })
    .catch(error => console.log('error', error))
})


router.post('/', (req, res, next) => {
  return knex('users')
  .insert({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    token: req.body.password,
    address: req.body.address,
  }, '*')
  .then(data => {
    res.send(data[0])
  })
  .catch(err => {
    res.status(404).send(err)
  })
})

module.exports = router
