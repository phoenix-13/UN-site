'use strict';

var Q = require('bluebird');
var Content = require('./content.model');
var errors = require('../../errors');
var assertDBResultExistence = errors.assertDBResultExistence;
var assertDBUpdateAffected = errors.assertDBUpdateAffected;
var ObjectId = require('mongoose').Types.ObjectId;

Q.promisifyAll(Content);
Q.promisifyAll(Content.prototype);

module.exports = {
  getOne,
  create,
  update,
  addSlide,
  updateSlide,
  removeSlide,
  addPartner,
  updatePartner,
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
  slide._id = new ObjectId();
  return Content.updateAsync({}, { $push: { 'slider': slide } })
    .then(() => Q.resolve(slide));
}

function updateSlide(slide) {
  return Content.updateAsync({ 'slider._id': slide._id }, { '$set': { 'slider.$': slide } })
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

function updatePartner(partner) {
  return Content.updateAsync({ 'partners._id': partner._id }, { '$set': { 'partners.$': partner } })
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
