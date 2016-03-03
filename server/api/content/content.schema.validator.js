'use strict';

var Q = require('bluebird');
var Joi = require('joibird');
var SchemaError = require('../../errors').SchemaError;

module.exports = {
  validateFeatured,
  validateSlide,
  validateBanner,
  validatePartner,
  validateContacts,
  validateAbout
};

var titleSchema = Joi.string().required().empty('');
var nameSchema = Joi.string().required().empty('');
var addressSchema = Joi.string().required().empty('');
var aboutSchema = Joi.string().required().empty('');

var bilingTitleSchema = Joi.object().keys({
  geo: titleSchema,
  eng: titleSchema
}).required();
var bilingNameSchema = Joi.object().keys({
  geo: nameSchema,
  eng: nameSchema
}).required();
var bilingAddressSchema = Joi.object().keys({
  geo: addressSchema,
  eng: addressSchema
}).required();

var refSchema = Joi.object().keys({
  _id: Joi.string().empty(''),
  type: Joi.string().empty(''),
  title: Joi.string().empty('')
});

var featuredItemSchema = Joi.object().keys({
  title: bilingTitleSchema,
  // ref: refSchema.required()
  link: Joi.string().empty('')
});

var featuredSchema = Joi.array().items(featuredItemSchema).required();
var slideSchema = Joi.object().keys({
  title: bilingTitleSchema,
  image: Joi.string().required(),
  ref: refSchema,
  link: Joi.string().empty('')
}).required();
var bannerSchema = Joi.object().keys({
  title: bilingTitleSchema,
  image: Joi.string().required(),
  link: Joi.string().required().empty('')
}).required();
var partnerSchema = Joi.object().keys({
  name: bilingNameSchema,
  image: Joi.string().required(),
  link: Joi.string().required().empty('')
}).required();
var contactsSchema = Joi.object().keys({
  address: bilingAddressSchema,
  coordinates: Joi.object().keys({
    latitude: Joi.number().required(),
    longitude: Joi.number().required()
  }).required(),
  phones: Joi.array().items(Joi.string()).required(),
  fax: Joi.string().required().empty(''),
  mail: Joi.string().email().required().empty('')
}).required();
var bilingAboutSchema = Joi.object().keys({
  geo: aboutSchema,
  eng: aboutSchema
}).required();

function validateFeatured(featured) {
  return Joi.validate(featured, featuredSchema)
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
