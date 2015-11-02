'use strict';

var Q = require('bluebird');
var Demographics = require('./Demographics.model');
var errors = require('../../errors');
var assertDBResultExistence = errors.assertDBResultExistence;
var assertDBUpdateAffected = errors.assertDBUpdateAffected;

Q.promisifyAll(Demographics);
Q.promisifyAll(Demographics.prototype);

module.exports = {
  getById,
  getAll,
  getLimited,
  create,
  update,
  addYearValue,
  removeYearValue,
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

function getLimited(offset, limit) {
  return Demographics
    .find()
    .select('')
    .skip(offset)
    .limit(limit)
    .execAsync();
}

function create() {
  return Demographics.createAsync.apply(Demographics, arguments)
    .then(assertDBResultExistence);
}

function update(id, doc) {
  return Demographics.updateAsync({ _id: id }, doc)
    .then(assertDBUpdateAffected);
}

function addYearValue(id, yearValue) {
  return Demographics.updateAsync({ _id: id }, { $push: { 'values': yearValue } })
    .then(assertDBUpdateAffected);
}

function removeYearValue(id, yearValueId) {
  return Demographics.updateAsync({ _id: id }, { $pull: { 'values': { _id: yearValueId } } })
    .then(assertDBUpdateAffected);
}

function remove(id) {
  return Demographics.removeAsync({_id: id })
    .then(assertDBUpdateAffected);
}

function removeAll() {
  return Demographics.removeAsync();
}
