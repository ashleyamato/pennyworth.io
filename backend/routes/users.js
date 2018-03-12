'use strict';

const express = require('express')
const router = express.Router()
const knex = require('../knex')

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
