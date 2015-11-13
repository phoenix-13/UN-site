'use strict';

var Q = require('bluebird');
var Admin = require('./admin.model');
var encrypt = require('../../utils/encryption');
var assertDBResultExistence = require('../../errors').assertDBResultExistence;

Q.promisifyAll(Admin);
Q.promisifyAll(Admin.prototype);

module.exports = {
  getById,
  getByName,
  create,
  authenticate,
  removeAll
};

function getById(adminId) {
  return Admin.findByIdAsync(adminId)
    .then(assertDBResultExistence);
}

function getByName(name) {
  return Admin.findOneAsync({name})
    .then(assertDBResultExistence);
}

function create(name, password) {
  return encrypt.generateHash(password)
    .then((hashedPassword) => Admin.createAsync({name, hashedPassword}))
    .then(assertDBResultExistence);
}

function authenticate(name, password) {
  var admin;
  return getByName(name)
    .then((foundAdmin) => {admin = foundAdmin;})
    .then(() => encrypt.compareHash(password, admin.hashedPassword))
    .then(() => admin);
}

function removeAll() {
  return Admin.removeAsync();
}
