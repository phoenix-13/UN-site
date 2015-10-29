'use strict';

var Publication = require('./publication.dao');
var publicationSchemaValidator = require('./publication.schema.validator');
var publicationBusinessLogicValidator = require('./publication.business.logic.validator');
var publicationParser = require('./publication.parser');

module.exports = {
  getById,
  getAll,
  getLimited,
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

function getLimited(offset, limit) {
  return Publication.getLimited(offset, limit);
}

function create(publication) {
  var parsedPublication = publicationParser.parsePublication(publication);
  return publicationSchemaValidator.validatePublication(parsedPublication)
    .then(validatedPublication => Publication.create(validatedPublication));
}

function update(publicationId, data) {
  var parsedData = publicationParser.parsePublication(data);
  return publicationSchemaValidator.validatePublication(parsedData)
    .then(schemaValidatedData => publicationBusinessLogicValidator.validateUpdate(publicationId, schemaValidatedData))
    .then(validatedUpdateData => Publication.update(publicationId, validatedUpdateData));
}

function remove(publicationId) {
  return publicationBusinessLogicValidator.validateRemove(publicationId)
    .then(publication => publication.remove(publication._id));
}
