'use strict';

var Q = require('bluebird');
var Indicator = require('./indicator.model');
var errors = require('../../errors');
var assertDBResultExistence = errors.assertDBResultExistence;
var assertDBUpdateAffected = errors.assertDBUpdateAffected;

Q.promisifyAll(Indicator);
Q.promisifyAll(Indicator.prototype);

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
  return Indicator.findByIdAsync(id)
    .then(assertDBResultExistence);
}

function getAll() {
  return Indicator.findAsync();
}

function getLimited(offset, limit) {
  return Indicator
    .find()
    .select('')
    .skip(offset)
    .limit(limit)
    .execAsync();
}

function create() {
  return Indicator.createAsync.apply(Indicator, arguments)
    .then(assertDBResultExistence);
}

function update(id, doc) {
  return Indicator.updateAsync({ _id: id }, doc)
    .then(assertDBUpdateAffected);
}

function addYearValue(id, year, value) {
  var yearValue = { year, value };
  return Indicator.updateAsync({ _id: id }, { $push: { 'values': yearValue } })
    .then(assertDBUpdateAffected);
}

function removeYearValue(id, year, value) {
  var yearValue = { year, value };
  return Indicator.updateAsync({ _id: id }, { $pull: { 'values': yearValue } })
    .then(assertDBUpdateAffected);
}

function remove(id) {
  return Indicator.removeAsync({_id: id })
    .then(assertDBUpdateAffected);
}

function removeAll() {
  return Indicator.removeAsync();
}
