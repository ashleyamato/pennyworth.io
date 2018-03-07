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

  test('POST /services should create a new service and return the name and message that were created.', (done) => {
    request(server)
      .post('/services')
      .set('Accept', 'application/json')
      .send({
        label:'test:clean'
      })
      .expect('Content-Type', /json/)
      .expect(200, {
        label:'test:clean'
      }, done);
    });

    test('GET /pennyworkers/:id should respond with an error if an id is not found.', (done) => {
      request(server)
        .get('/pennyworkers/5')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404, { error: "not found" }, done);
    });

    test('GET /users_services should return user and associated services.', (done) => {
      request(server)
        .get('/users_services')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(function(res){
          for (var i = 0; i < res.body.length; i++) {
            delete res.body[i].created_at
            delete res.body[i].updated_at
          }
        })
        .expect(200, [{
            "id": 1,
            "first_name": "Ashley",
            "last_name": "Amato",
            "email": "ashleyamato1@gmail.com",
            "token": "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
            "pennyworker_id": 1,
            "address": "1111 Bear Mountain Dr, Boulder, CO, 80303",
            "services": [
              {
                "id": 3,
                "label": "Packages & Mail",
                "notes": "Package from Amazon should have arrived, please put on table",
                "date": "2018-03-27",
                "time": "10:00AM"
              },
              {
                "id": 1,
                "label": "Tidy-up",
                "notes": "Please pickup the clothes in the bathroom",
                "date": "2018-03-27",
                "time": "10:00AM"
              }
            ]
          },
          {
            "id": 2,
            "first_name": "Olivia",
            "last_name": "Burgener",
            "email": "livburgener@gmail.com",
            "token": "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
            "pennyworker_id": 2,
            "address": "2222 Chiron Street , Lafayette, CO, 80026",
            "services": [
              {
                "id": 4,
                "label": "Grocery Shopping",
                "notes": "Eggs, Milk, Whole Wheat Bread, Bananas",
                "date": "2018-04-04",
                "time": "09:00AM"
              }
            ]
          },
          {
            "id": 3,
            "first_name": "Eddie",
            "last_name": "Marovich",
            "email": "eddiemarovich@gmail.com",
            "token": "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
            "pennyworker_id": 2,
            "address": "1111 Lovin It Lane, Boulder, CO, 80303",
            "services": [
              {
                "id": 5,
                "label": "Pickup Prescription",
                "notes": "Please pickup prescription at Walgreens on US-287",
                "date": "2018-04-04",
                "time": "09:00AM"
              }
            ]
          }], done)
      })

    test('PATCH /messages/:id should update a message and return the id, name, and message that were updated.', (done) => {
      request(server)
        .patch('/users_services/1')
        .set('Accept', 'application/json')
        .send({
          notes:'Please pickup the clothes in the bathroom'
        })
        .expect('Content-Type', /json/)
        .expect(function(res){
          delete res.body.created_at
          delete res.body.updated_at
        })
        .expect(200, {
          id:1,
          user_id: 1,
          service_id: 1,
          notes:'Please pickup the clothes in the bathroom',
          date: '2018-03-27',
          time: '10:00AM',
        }, done)

    })

})
