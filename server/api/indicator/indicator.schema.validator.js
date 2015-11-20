'use strict';

var Q = require('bluebird');
var Joi = require('joibird');
var SchemaError = require('../../errors').SchemaError;

module.exports = {
  validateIndicator
};

var titleSchema = Joi.string().required().empty('');
var yearValueSchema = Joi.object().keys({
  year: Joi.number().required(),
  value: Joi.number().required()
});
var contentSchema = Joi.string().required().empty('');

var bilingTitleSchema = Joi.object().keys({
  geo: titleSchema,
  eng: titleSchema
}).required();

var bilingContentSchema = Joi.object().keys({
  geo: contentSchema,
  eng: contentSchema
}).required();

var indicatorSchema = Joi.object().keys({
  title: bilingTitleSchema,
  date: Joi.date().required(),
  values: Joi.array().items(yearValueSchema).required(),
  content: bilingContentSchema,
  category: Joi.string().required()
}).required();

function validateIndicator(indicator) {
  return Joi.validate(indicator, indicatorSchema)
    .catch(err => Q.reject(new SchemaError(err.message)));
}
