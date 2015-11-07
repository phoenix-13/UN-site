'use strict';

var Q = require('bluebird');
var Content = require('./content.model');
var errors = require('../../errors');
var assertDBResultExistence = errors.assertDBResultExistence;
var assertDBUpdateAffected = errors.assertDBUpdateAffected;

Q.promisifyAll(Content);
Q.promisifyAll(Content.prototype);

module.exports = {
  getOne,
  create,
  update,
  addSlide,
  removeSlide,
  addPartner,
  removePartner,
  removeOne,
  removeAll
};

function getOne() {
  return Content.findOneAsync({})
    .then(assertDBResultExistence);
}

function create(content) {
  return Content.createAsync(content)
    .then(assertDBResultExistence);
}

function update(doc) {
  return Content.updateAsync({}, doc)
    .then(assertDBUpdateAffected);
}

function addSlide(slide) {
  return Content.updateAsync({}, { $push: { 'slider': slide } })
    .then(assertDBUpdateAffected);
}

function removeSlide(slideId) {
  return Content.updateAsync({}, { $pull: { 'slider': { _id: slideId } } })
    .then(assertDBUpdateAffected);
}

function addPartner(partner) {
  return Content.updateAsync({}, { $push: { 'partners': partner } })
    .then(assertDBUpdateAffected);
}

function removePartner(partnerId) {
  return Content.updateAsync({}, { $pull: { 'partners': { _id: partnerId } } })
    .then(assertDBUpdateAffected);
}

function removeOne() {
  return Content.findOneAndRemoveAsync({});
}

function removeAll() {
  return Content.removeAsync();
}
