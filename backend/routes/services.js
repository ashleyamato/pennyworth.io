'use strict';

const express = require('express')
const router = express.Router()
const knex = require('../knex')

router.get('/', (req, res, next) => {
   return knex('services')
  .select('*')
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.status(404).send(err)
  })
})

router.post('/', (req, res, next) => {
  let body = req.body
  return knex('services')
  .insert(body, ['label'])
  .then(data => {
    res.send(data[0])
  })
  .catch(err => {
    res.status(404).send(err)
  })
})


module.exports = router
