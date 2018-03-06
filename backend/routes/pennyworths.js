'use strict';

const express = require('express')
const router = express.Router()
const knex = require('../knex')

router.get('/', (req, res, next) => {
   return knex('pennyworths')
  .select('*')
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.status(404).send(err)
  })
})

router.get('/:id', (req,res,next) => {
  let id = req.params.id
  return knex('pennyworths')
  .where('id', id)
  .select('id', 'first_name', 'last_name')
  .then(data => {
    if(data.length != 0){
      res.send(data[0])
    } else {
      res.status(404).send({ error: "not found" })
    }
  })
  .catch(err => {
    res.status(404).send(err)
  })
})

module.exports = router
