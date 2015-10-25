'use strict';

var util = require('util');

function DBEmptyResultError(argument) {
  DBEmptyResultError.super_.call(this);
  this.name = 'DBEmptyResultError';
  this.message = argument || '';
  this.code = 400;
}

util.inherits(DBEmptyResultError, Error);

module.exports = DBEmptyResultError;
