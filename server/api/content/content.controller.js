'use strict';

var Content = require('./content.dao');
var contentSchemaValidator = require('./content.schema.validator');
var contentParser = require('./content.parser');

module.exports = {
  getOne,
  updateFeatured,
  addSlide,
  addPartner,
  updateContacts,
  updateBanner,
  updateAbout
};

function getOne() {
  return Content.getOne();
}

function updateFeatured(featured) {
  var parsedFeatured = contentParser.parseFeatured(featured);
  return contentSchemaValidator.validateFeatured(parsedFeatured)
    .then(schemaValidatedFeatured => Content.update(schemaValidatedFeatured));
}

function addSlide(slide) {
  var parsedSlide = contentParser.parseSlide(slide);
  return contentSchemaValidator.validateSlide(parsedSlide)
    .then(schemaValidatedSlide => Content.addSlide(schemaValidatedSlide));
}

function addPartner(partner) {
  var parsedPartner = contentParser.parsePartner(partner);
  return contentSchemaValidator.validatePartner(parsedPartner)
    .then(schemaValidatedPartner => Content.addPartner(schemaValidatedPartner));
}

function updateContacts(contacts) {
  var parsedContacts = contentParser.parseContacts(contacts);
  return contentSchemaValidator.validateContacts(parsedContacts)
    .then(schemaValidatedContacts => Content.update(schemaValidatedContacts));
}

function updateBanner(banner) {
  var parsedBanner = contentParser.parseBanner(banner);
  return contentSchemaValidator.validateBanner(parsedBanner)
    .then(schemaValidatedBanner => Content.update(schemaValidatedBanner));
}

function updateAbout(about) {
  var parsedAbout = contentParser.parseAbout(about);
  return contentSchemaValidator.validateAbout(parsedAbout)
    .then(schemaValidatedAbout => Content.update(schemaValidatedAbout));
}
