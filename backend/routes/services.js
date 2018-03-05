'use strict';

const express = require('express')
const router = express.Router()
const knex = require('../knex')

router.get('/', (req, res, next) => {
   knex('services')
  .select('*')
  .then(data => {
    console.log(data);
    res.send(data)
  })
  .catch(err => {
    res.status(404).send(err)
  })
})

module.exports = router
