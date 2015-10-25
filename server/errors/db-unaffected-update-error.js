'use strict';

var util = require('util');

function DBUnaffectedUpdateError(argument) {
  DBUnaffectedUpdateError.super_.call(this);
  this.name = 'DBUnaffectedUpdateError';
  this.message = argument || '';
  this.code = 400;
}

util.inherits(DBUnaffectedUpdateError, Error);

module.exports = DBUnaffectedUpdateError;
