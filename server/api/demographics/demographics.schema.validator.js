'use strict';

var Q = require('bluebird');
var Joi = require('joibird');
var SchemaError = require('../../errors').SchemaError;

module.exports = {
  validateYearValues
};

var yearValueSchema = Joi.object().keys({
  year: Joi.number().required(),
  value: Joi.number().required()
});

var yearValuesSchema = Joi.array().items(yearValueSchema).required();

function validateYearValues(yearValues) {
  return Joi.validate(yearValues, yearValuesSchema)
    .catch((err) => Q.reject(new SchemaError(err.message)));
}
