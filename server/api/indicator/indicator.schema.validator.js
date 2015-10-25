'use strict';

var Q = require('bluebird');
var Joi = require('joibird');
var indicatorConstants = require('./indicator.constants');
var SchemaError = require('../../errors').SchemaError;

module.exports = {
  validateIndicator
};

var titleSchema = Joi.string().min(indicatorConstants.titleMinLength).max(indicatorConstants.titleMaxLength).required();
var yearValueSchema = Joi.object().keys({
  year: Joi.number().min(indicatorConstants.yearMinValue).max(indicatorConstants.yearMaxValue),
  value: Joi.number().min(indicatorConstants.minValue).max(indicatorConstants.maxValue)
});
var contentSchema = Joi.string();

var bilingTitleSchema = Joi.object().keys({
  geo: titleSchema,
  eng: titleSchema
}).required();

var bilingContentSchema = Joi.object().keys({
  geo: contentSchema,
  eng: contentSchema
});

var indicatorSchema = Joi.object().keys({
  title: bilingTitleSchema,
  date: Joi.date().format(indicatorConstants.dateFormat),
  values: Joi.array().items(yearValueSchema),
  content: bilingContentSchema
}).required();

function validateIndicator(indicator) {
  return Joi.validate(indicator, indicatorSchema)
    .catch((err) => Q.reject(new SchemaError(err.message)));
}
