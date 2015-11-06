'use strict';

var Q = require('bluebird');
var Joi = require('joibird');
var contentConstants = require('./content.constants');
var SchemaError = require('../../errors').SchemaError;

module.exports = {
  validateFeatured,
  validateSlide,
  validateBanner,
  validatePartner,
  validateContacts,
  validateAbout
};

var titleSchema = Joi.string().min(contentConstants.titleMinLength).max(contentConstants.titleMaxLength).required();
var nameSchema = Joi.string().min(contentConstants.nameMinLength).max(contentConstants.nameMaxLength);
var addressSchema = Joi.string().max(contentConstants.addressMaxLength).required().empty('');
var aboutSchema = Joi.string().min(contentConstants.aboutMinLength).max(contentConstants.aboutMaxLength);

var bilingTitleSchema = Joi.object().keys({
  geo: titleSchema,
  eng: titleSchema
}).required();
var bilingNameSchema = Joi.object().keys({
  geo: nameSchema,
  eng: nameSchema
});
var bilingAddressSchema = Joi.object().keys({
  geo: addressSchema,
  eng: addressSchema
}).required();

var featuredSchema = Joi.object().keys({
  title: bilingTitleSchema,
  link: Joi.string().required()
}).required();

var featuredsSchema = Joi.array().items(featuredSchema).required();
var slideSchema = Joi.object().keys({
  title: bilingTitleSchema,
  image: Joi.string().required(),
  link: Joi.string()
}).required();
var bannerSchema = Joi.object().keys({
  image: Joi.string().required(),
  link: Joi.string()
}).required();
var partnerSchema = Joi.object().keys({
  name: bilingNameSchema,
  image: Joi.string().required(),
  link: Joi.string()
}).required();
var contactsSchema = Joi.object().keys({
  address: bilingAddressSchema,
  coordinates: Joi.object().keys({
    latitude: Joi.number().required(),
    longitude: Joi.number().required()
  }).required(),
  phones: Joi.array().items(Joi.string()).required(),
  fax: Joi.string().required(),
  mail: Joi.string().email().required()
}).required();
var bilingAboutSchema = Joi.object().keys({
  geo: aboutSchema,
  eng: aboutSchema
}).required();

function validateFeatured(featured) {
  return Joi.validate(featured, featuredsSchema)
    .catch((err) => Q.reject(new SchemaError(err.message)));
}

function validateSlide(slide) {
  return Joi.validate(slide, slideSchema)
    .catch((err) => Q.reject(new SchemaError(err.message)));
}

function validateBanner(banner) {
  return Joi.validate(banner, bannerSchema)
    .catch((err) => Q.reject(new SchemaError(err.message)));
}

function validatePartner(partner) {
  return Joi.validate(partner, partnerSchema)
    .catch((err) => Q.reject(new SchemaError(err.message)));
}

function validateContacts(contacts) {
  return Joi.validate(contacts, contactsSchema)
    .catch((err) => Q.reject(new SchemaError(err.message)));
}

function validateAbout(about) {
  return Joi.validate(about, bilingAboutSchema)
    .catch(err => Q.reject(new SchemaError(err.message)));
}
