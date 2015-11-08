'use strict';

var Content = require('./content.dao');
var contentSchemaValidator = require('./content.schema.validator');
var contentParser = require('./content.parser');

module.exports = {
  getOne,
  updateFeatured,
  addSlide,
  updateSlide,
  removeSlide,
  updateBanner,
  addPartner,
  updatePartner,
  removePartner,
  updateContacts,
  updateAbout
};

function getOne() {
  return Content.getOne();
}

function updateFeatured(featured) {
  var parsedFeatured = contentParser.parseFeatured(featured);
  return contentSchemaValidator.validateFeatured(parsedFeatured)
    .then(schemaValidatedFeatured => {
      var updateData = { featured: schemaValidatedFeatured };
      Content.update(updateData);
    });
}

function addSlide(slide) {
  var parsedSlide = contentParser.parseSlide(slide);
  return contentSchemaValidator.validateSlide(parsedSlide)
    .then(schemaValidatedSlide => Content.addSlide(schemaValidatedSlide));
}

function updateSlide(slideId, slide) {
  var parsedSlide = contentParser.parseSlide(slide);
  return contentSchemaValidator.validateSlide(parsedSlide)
    .then(schemaValidatedSlide => {
      schemaValidatedSlide._id = slideId;
      Content.updateSlide(schemaValidatedSlide);
    });
}

function removeSlide(slideId) {
  return Content.removeSlide(slideId);
}

function updateBanner(banner) {
  var parsedBanner = contentParser.parseBanner(banner);
  return contentSchemaValidator.validateBanner(parsedBanner)
    .then(schemaValidatedBanner => {
      var updateData = { banner: schemaValidatedBanner };
      return Content.update(updateData);
    });
}

function addPartner(partner) {
  var parsedPartner = contentParser.parsePartner(partner);
  return contentSchemaValidator.validatePartner(parsedPartner)
    .then(schemaValidatedPartner => Content.addPartner(schemaValidatedPartner));
}

function updatePartner(partnerId, partner) {
  var parsedPartner = contentParser.parsePartner(partner);
  return contentSchemaValidator.validatePartner(parsedPartner)
    .then(schemaValidatedPartner => {
      schemaValidatedPartner._id = partnerId;
      Content.updatePartner(schemaValidatedPartner);
    });
}

function removePartner(partnerId) {
  return Content.removePartner(partnerId);
}

function updateContacts(contacts) {
  var parsedContacts = contentParser.parseContacts(contacts);
  return contentSchemaValidator.validateContacts(parsedContacts)
    .then(schemaValidatedContacts => {
      var updateData = { contacts: schemaValidatedContacts };
      return Content.update(updateData);
    });
}

function updateAbout(about) {
  var parsedAbout = contentParser.parseAbout(about);
  return contentSchemaValidator.validateAbout(parsedAbout)
    .then(schemaValidatedAbout => {
      var updateData = { about: schemaValidatedAbout };
      return Content.update(updateData);
    });
}
