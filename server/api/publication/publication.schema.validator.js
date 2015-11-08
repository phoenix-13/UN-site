'use strict';

var Q = require('bluebird');
var Joi = require('joibird');
var SchemaError = require('../../errors').SchemaError;

module.exports = {
  validatePublication
};

var titleSchema = Joi.string().required().empty('');
var contentSchema = Joi.string().required().empty('');

var bilingTitleSchema = Joi.object().keys({
  geo: titleSchema,
  eng: titleSchema
}).required();

var bilingContentSchema = Joi.object().keys({
  geo: contentSchema,
  eng: contentSchema
}).required();

var publicationSchema = Joi.object().keys({
  title: bilingTitleSchema,
  date: Joi.date().required(), // questions exist
  content: bilingContentSchema,
  category: Joi.string().required()
}).required();

function validatePublication(publication) {
  return Joi.validate(publication, publicationSchema)
    .catch((err) => Q.reject(new SchemaError(err.message)));
}
