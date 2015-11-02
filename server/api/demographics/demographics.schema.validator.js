'use strict';

var Q = require('bluebird');
var Joi = require('joibird');
var demographicsConstants = require('./demographics.constants');
var SchemaError = require('../../errors').SchemaError;

module.exports = {
  validateYearValue
};

var yearValueSchema = Joi.object().keys({
  year: Joi.number().min(demographicsConstants.yearMinValue).max(demographicsConstants.yearMaxValue).required(),
  value: Joi.number().min(demographicsConstants.minValue).max(demographicsConstants.maxValue).required()
}).required();

function validateYearValue(yearValue) {
  return Joi.validate(yearValue, yearValueSchema)
    .catch((err) => Q.reject(new SchemaError(err.message)));
}
