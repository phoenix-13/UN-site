'use strict';

var Q = require('bluebird');
var Demographics = require('./demographics.model');
var errors = require('../../errors');
var assertDBResultExistence = errors.assertDBResultExistence;
var assertDBUpdateAffected = errors.assertDBUpdateAffected;

Q.promisifyAll(Demographics);
Q.promisifyAll(Demographics.prototype);

module.exports = {
  getById,
  getAll,
  create,
  updateYearValues,
  remove,
  removeAll
};

function getById(id) {
  return Demographics.findByIdAsync(id)
    .then(assertDBResultExistence);
}

function getAll() {
  return Demographics.findAsync();
}

function create() {
  return Demographics.createAsync.apply(Demographics, arguments)
    .then(assertDBResultExistence);
}

function updateYearValues(id, yearValues) {
  return Demographics.updateAsync({ _id: id }, { values: yearValues })
    .then(assertDBUpdateAffected);
}

function remove(id) {
  return Demographics.removeAsync({ _id: id })
    .then(assertDBUpdateAffected);
}

function removeAll() {
  return Demographics.removeAsync();
}
