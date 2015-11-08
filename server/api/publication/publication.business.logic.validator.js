'use strict';

var Q = require('bluebird');
var Publication = require('./publication.dao');
var BusinessLogicValidationError = require('../../errors').BusinessLogicValidationError;

module.exports = {
  validateUpdate,
  validateRemove
};

function exists(publicationId, res) {
  return Publication.getById(publicationId)
    .then(publication => {
      res = res || publication;
      return Q.resolve(res);
    })
    .catch(err => {
      return Q.reject(new BusinessLogicValidationError(err));
    });
}

function validateUpdate(publicationId, doc) {
  return exists(publicationId, doc);
}

function validateRemove(publicationId) {
  return exists(publicationId);
}
