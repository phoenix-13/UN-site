'use strict';

var Q = require('bluebird');
var Category = require('./category.model');
var errors = require('../../errors');
var assertDBResultExistence = errors.assertDBResultExistence;

Q.promisifyAll(Category);
Q.promisifyAll(Category.prototype);

module.exports = {
  getById,
  getAll,
  create,
  removeAll
};

function getById(id) {
  return Category.findByIdAsync(id)
    .then(assertDBResultExistence);
}

function getAll() {
  return Category
  .find()
  .sort({ _id: 1 })
  .execAsync();
}

function create() {
  return Category.createAsync.apply(Category, arguments)
    .then(assertDBResultExistence);
}

function removeAll() {
  return Category.removeAsync();
}
