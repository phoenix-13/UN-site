'use strict';

var Q = require('bluebird');
var Demographics = require('./demographics.dao');
var BusinessLogicValidationError = require('../../errors').BusinessLogicValidationError;

module.exports = {
  validateAddYearValue,
  validateRemoveYearValue,
  validateRemove
};

function exists(demographicsId, res) {
  return Demographics.getById(demographicsId)
    .then(demographics => {
      res = res || demographics;
      return Q.resolve(res);
    })
    .catch(err => {
      return Q.reject(new BusinessLogicValidationError(err));
    });
}

function validateAddYearValue(demographicsId) {
  return exists(demographicsId);
}

function validateRemoveYearValue(demographicsId) {
  return exists(demographicsId);
}

function validateRemove(demographics) {
  return exists(demographics._id);
}
