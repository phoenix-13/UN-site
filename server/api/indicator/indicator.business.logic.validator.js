'use strict';

var Q = require('bluebird');
var Indicator = require('./indicator.dao');
var BusinessLogicValidationError = require('../../errors').BusinessLogicValidationError;

module.exports = {
  validateUpdate,
  // validateAddYearValue,
  // validateRemoveYearValue,
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

function validateUpdate(indicatorId, doc) {
  return exists(indicatorId, doc);
}

// function validateAddYearValue(indicatorId, yearValue) {
//   return exists(indicatorId, yearValue);
// }

// function validateRemoveYearValue(indicatorId) {
//   return exists(indicatorId);
// }

function validateRemove(indicatorId) {
  return exists(indicatorId);
}
