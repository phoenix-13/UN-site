'use strict';

var Q = require('bluebird');
var Joi = require('joibird');
var publicationConstants = require('./publication.constants');
var SchemaError = require('../../errors').SchemaError;

module.exports = {
  validatePublication
};

var titleSchema = Joi.string().min(publicationConstants.titleMinLength).max(publicationConstants.titleMaxLength).required();
var contentSchema = Joi.string();

var bilingTitleSchema = Joi.object().keys({
  geo: titleSchema,
  eng: titleSchema
}).required();

var bilingContentSchema = Joi.object().keys({
  geo: contentSchema,
  eng: contentSchema
});

var publicationSchema = Joi.object().keys({
  title: bilingTitleSchema,
  date: Joi.date().format(publicationConstants.dateFormat).min(publicationConstants.dateMinValue).max(publicationConstants.dateMaxValue).required(),
  content: bilingContentSchema,
  category: Joi.required()
}).required();

function validatePublication(publication) {
  return Joi.validate(publication, publicationSchema)
    .then(validatedSchema => {
      validatedSchema.year = validatedSchema.date.getFullYear();
      return Q.resolve(validatedSchema);
    })
    .catch((err) => Q.reject(new SchemaError(err.message)));
}
