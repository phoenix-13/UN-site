'use strict';

var Q = require('bluebird');
var File = require('./file.model');
var errors = require('../../errors');
var assertDBResultExistence = errors.assertDBResultExistence;
var assertDBUpdateAffected = errors.assertDBUpdateAffected;

Q.promisifyAll(File);
Q.promisifyAll(File.prototype);

module.exports = {
  getById,
  getAll,
  create,
  remove,
  removeAll
};

function getById(id) {
  return File.findByIdAsync(id)
    .then(assertDBResultExistence);
}

function getAll() {
  return File.findAsync();
}

function create() {
  return File.createAsync.apply(File, arguments)
    .then(assertDBResultExistence);
}

function remove(name) {
  return File.removeAsync({ name })
    .then(assertDBUpdateAffected);
}

function removeAll() {
  return File.removeAsync();
}
