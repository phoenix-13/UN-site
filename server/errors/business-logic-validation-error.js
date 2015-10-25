'use strict';

var util = require('util');

function BusinessLogicValidationError(argument) {
  BusinessLogicValidationError.super_.call(this);
  this.name = 'BusinessLogicValidationError';
  this.message = argument || '';
  this.code = 400;
}

util.inherits(BusinessLogicValidationError, Error);

module.exports = BusinessLogicValidationError;
