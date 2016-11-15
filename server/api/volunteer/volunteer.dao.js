'use strict';

var Promise = require('bluebird');
var Model = require('./event.model');
var errors = require('../../errors');
var assertDBResultExistence = errors.assertDBResultExistence;


module.exports = {
  getAll,
  getByQuery,
  getById,

  create,
  insertMany,
  update,

  destroy,
  destroyAll
};


// =============== getters ===============

function getAll() {
  return Model.find();
}

function getByQuery(findQuery, orQuery, sortBy, offset, limit) {
  return Promise.all([
    Model.find(findQuery).or(orQuery).sort(sortBy).skip(offset).limit(limit),
    Model.find(findQuery).or(orQuery).count()
  ]).spread(getResultObject);
}

function getResultObject(items, numTotal) {
  return {
    items,
    numTotal
  };
}

function getById(id) {
  return Model.findOne({ _id: id })
    .then(assertDBResultExistence);
}

// =============== setters ===============

function create(data) {
  return Model.create(data);
}

function insertMany(data) {
  return Model.insertMany(data);
}

function update(id, data) {
  return Model.findOneAndUpdate({ _id: id }, { $set: data })
    .then(assertDBResultExistence);
}

function destroy(id) {
  return Model.findOneAndRemove({ _id: id })
    .then(assertDBResultExistence);
}

function destroyAll() {
  return Model.remove();
}
