'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');

suite('CRUD routes', () => {

  test('GET /services should return the id and label of all services.', (done) => {
    request(server)
      .get('/services')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [
        {id: 1, label: 'Tidy-up'},
        {id: 2, label: 'Laundry & Clothes'},
        {id: 3, label: 'Packages & Mail'},
        {id: 4, label: 'Grocery Shopping'},
        {id: 5, label: 'Pickup Prescription'
      }], done);
  });

  // test('POST /services should create a new service and return the name and message that were created.', (done) => {
  //   request(server)
  //     .post('/services')
  //     .set('Accept', 'application/json')
  //     .send({
  //       label:'test:clean'
  //     })
  //     .expect('Content-Type', /json/)
  //     .expect(200, {
  //       label:'test:clean'
  //     }, done);
  //   });

    test('GET /pennyworths/:id should respond with an error if an id is not found.', (done) => {
      request(server)
        .get('/pennyworths/5')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404, { error: "not found" }, done);
    });


});
