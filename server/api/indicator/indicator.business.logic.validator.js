'use strict';

var Q = require('bluebird');
var Indicator = require('./indicator.dao');
var BusinessLogicValidationError = require('../../errors').BusinessLogicValidationError;

module.exports = {
  validateUpdate,
  validateAddYearValue,
  validateRemoveYearValue,
  validateRemove
};

function exists(indicatorId, res) {
  return Indicator.getById(indicatorId)
    .then(indicator => {
      res = res || indicator;
      return Q.resolve(res);
    })
    .catch(err => {
      return Q.reject(new BusinessLogicValidationError(err));
    });
}

function validateUpdate(indicator, doc) {
  return exists(indicator._id, doc);
}

function validateAddYearValue(indicatorId) {
  return exists(indicatorId);
}

function validateRemoveYearValue(indicatorId) {
  return exists(indicatorId);
}

function validateRemove(indicator) {
  return exists(indicator._id);
}
