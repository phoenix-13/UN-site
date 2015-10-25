'use strict';

var util = require('util');

function SchemaError(argument) {
  SchemaError.super_.call(this);
  this.name = 'SchemaError';
  this.message = argument || '';
  this.code = 400;
}

util.inherits(SchemaError, Error);

module.exports = SchemaError;
