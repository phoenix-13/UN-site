'use strict';

var Q = require('bluebird');
var Publication = require('./publication.model');
var errors = require('../../errors');
var assertDBResultExistence = errors.assertDBResultExistence;
var assertDBUpdateAffected = errors.assertDBUpdateAffected;

Q.promisifyAll(Publication);
Q.promisifyAll(Publication.prototype);

module.exports = {
  getById,
  getAll,
  getLimited,
  create,
  update,
  remove,
  removeAll
};

function getById(id) {
  return Publication.findByIdAsync(id)
    .then(assertDBResultExistence);
}

function getAll() {
  return Publication.findAsync();
}

function getLimited(offset, limit) {
  return Publication
    .find()
    .select('')
    .skip(offset)
    .limit(limit)
    .execAsync();
}

function create() {
  return Publication.createAsync.apply(Publication, arguments)
    .then(assertDBResultExistence);
}

function update(id, doc) {
  return Publication.updateAsync({ _id: id }, doc)
    .then(assertDBUpdateAffected);
}

function remove(id) {
  return Publication.removeAsync({_id: id})
    .then(assertDBUpdateAffected);
}

function removeAll() {
  return Publication.removeAsync();
}
