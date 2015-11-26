'use strict';

var Q = require('bluebird');
var Joi = require('joibird');
var SchemaError = require('../../errors').SchemaError;

module.exports = {
  validateIndicator
};

var textSchema = Joi.string().required().allow('');

var yearValueSchema = Joi.object().keys({
  year: Joi.number().required(),
  value: textSchema
});

var bilingTextSchema = Joi.object().keys({
  geo: textSchema,
  eng: textSchema
}).required();

var indicatorSchema = Joi.object().keys({
  title: bilingTextSchema,
  date: Joi.date().required(),
  values: Joi.array().items(yearValueSchema).required(),
  content: bilingTextSchema,
  category: Joi.string().required()
}).required();

function validateIndicator(indicator) {
  return Joi.validate(indicator, indicatorSchema)
    .catch(err => Q.reject(new SchemaError(err.message)));
}
