'use strict';

var Q = require('bluebird');
var Publication = require('./publication.dao');
var publicationSchemaValidator = require('./publication.schema.validator');
var publicationBusinessLogicValidator = require('./publication.business.logic.validator');
var publicationParser = require('./publication.parser');
var publicationConstants = require('./publication.constants');

module.exports = {
  getById,
  getAll,
  getLimited,
  getLatest,
  create,
  update,
  remove
};

function getById(publicationId) {
  return Publication.getById(publicationId);
}

function getAll() {
  return Publication.getAll();
}

function getLimited(offset) {
  var res = {};
  var limit = publicationConstants.perPageLimit;
  return Publication.getLimited(offset, limit)
    .then(foundPublications => {
      res.items = foundPublications;
      return Publication.countAll();
    })
    .then(numTotal => {
      res.numTotal = numTotal;
      return Q.resolve(res);
    })
}

function getLatest() {
  return Publication.getLimited(0, publicationConstants.latestLimit);
}

function create(publication) {
  var parsedPublication = publicationParser.parsePublication(publication);
  return publicationSchemaValidator.validatePublication(parsedPublication)
    .then(validatedPublication => {
      validatedPublication.year = validatedPublication.date.getFullYear();
      return Publication.create(validatedPublication);
    });
}

function update(publicationId, data) {
  var parsedData = publicationParser.parsePublication(data);
  return publicationSchemaValidator.validatePublication(parsedData)
    .then(schemaValidatedData => publicationBusinessLogicValidator.validateUpdate(publicationId, schemaValidatedData))
    .then(validatedUpdateData => {
      validatedUpdateData.year = validatedUpdateData.date.getFullYear();
      return Publication.update(publicationId, validatedUpdateData);
    });
}

function remove(publicationId) {
  return publicationBusinessLogicValidator.validateRemove(publicationId)
    .then(publication => Publication.remove(publication._id));
}
