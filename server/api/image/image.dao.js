'use strict';

var Q = require('bluebird');
var ImageModel = require('./image.model');
var errors = require('../../errors');
var assertDBResultExistence = errors.assertDBResultExistence;
var assertDBUpdateAffected = errors.assertDBUpdateAffected;

Q.promisifyAll(ImageModel);
Q.promisifyAll(ImageModel.prototype);

module.exports = {
  getById,
  getAll,
  create,
  imageExists,
  remove,
  removeAll
};

function getById(imageId) {
  return ImageModel.findByIdAsync(imageId)
    .then(assertDBResultExistence);
}
function getAll() {
  return ImageModel.findAsync();
}

function imageExists(fileName) {
  return ImageModel.findOneAsync({fileName})
    .then(assertDBResultExistence);
}

function create(image) {
  return ImageModel.createAsync(image)
    .then(assertDBResultExistence);
}

function remove(fileName) {
  return ImageModel.removeAsync({ fileName })
    .then(assertDBUpdateAffected);
}

function removeAll() {
  return ImageModel.removeAsync();
}
