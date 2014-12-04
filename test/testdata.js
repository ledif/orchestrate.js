// Copyright 2014 Orchestrate, Inc.
/**
 * @fileoverview Test data
 */

var assert = require('assert');
var Q = require('kew');
var token = require('./creds').token;
var db = require('../lib-cov/client')(token);
var util = require('util');

// Test data.
function Users() {
  this.steve_v0 = {
    "name": "Steve Kaliski",
    "email": "sjkaliski@gmail.com",
    "location": "New York",
    "type": "paid",
    "gender": "male"
  };

  this.steve_v1 = {
    "name": "Steve Kaliski",
    "email": "sjkaliski@gmail.com",
    "location": "New York, NY",
  };

  this.steve_v2 = {
    "name": "Steve Kaliski",
    "email": "sjkaliski@gmail.com",
    "location": "New York, NY",
    "type": "consultant"
  };

  this.steve_v3 = {
    "name": "Steve Kaliski",
    "email": "sjkaliski@gmail.com",
    "location": "New York, NY",
    "type": "salaried"
  };

  this.david = {
    "name": "David Byrd",
    "email": "byrd@bowery.io",
    "location": "New York",
    "type": "paid",
    "gender": "male"
  };

  this.kelsey = {
    "name": "Kelsey Jarblenkins",
    "email": "kelsey@jarblenkins.com",
    "location": "Boston, MA",
    "type": "free",
    "gender": "genderqueer"
  };

  this.kelsey_v1 = {
    "name": "Kelsey Jarblenkins",
    "email": "kelsey@jarblenkins.com",
    "location": "Boston, MA",
    "type": "consultant",
    "gender": "genderqueer"
  };
}


Users.prototype.reset = function(done) {
  var dels = [];
  var obj = this;
  dels.push(db.remove('users', obj.steve_v0.email, true));
  dels.push(db.remove('users', obj.david.email, true));
  dels.push(db.remove('users', obj.kelsey.email, true));
  Q.all(dels)
    .then(function (res) {
      assert.equal(3, res.length);
      for(var i in res) {
        assert.equal(204, res[i].statusCode);
      }

      return db.put('users', obj.david.email, obj.david);
    })
    .then(function (res) {
      assert.equal(201, res.statusCode);
      done();
    })
    .fail(function (res) {
      done(res);
    });
};

module.exports = new Users();

