'use strict';

var Indicator = require('./indicator.dao');
var indicatorSchemaValidator = require('./indicator.schema.validator');
var indicatorBusinessLogicValidator = require('./indicator.business.logic.validator');
var indicatorParser = require('./indicator.parser');

module.exports = {
  getById,
  getAll,
  getLimited,
  create,
  update,
  addYearValue,
  removeYearValue,
  remove
};

function getById(indicatorId) {
  return Indicator.getById(indicatorId);
}

function getAll() {
  return Indicator.getAll();
}

function getLimited(offset, limit) {
  return Indicator.getLimited(offset, limit);
}

function create(indicator) {
  var parsedIndicator = indicatorParser.parseCreateIndicator(indicator);
  return indicatorSchemaValidator.validateIndicator(parsedIndicator)
    .then(validatedIndicator => Indicator.create(validatedIndicator));
}

function update(indicatorId, data) {
  var parsedData = indicatorParser.parseUpdateIndicator(data);
  return indicatorSchemaValidator.validateIndicator(parsedData)
    .then(schemaValidatedData => indicatorBusinessLogicValidator.validateUpdate(indicatorId, schemaValidatedData))
    .then(validatedUpdateData => Indicator.update(indicatorId, validatedUpdateData));
}

function addYearValue(indicatorId, yearValue) {
  var parsedYearValue = indicatorParser.parseYearValue(yearValue);
  return indicatorSchemaValidator.validateYearValue(parsedYearValue)
    .then(schemaValidatedYearValue => indicatorBusinessLogicValidator.validateAddYearValue(indicatorId, schemaValidatedYearValue))
    .then(validatedYearValue => Indicator.addYearValue(indicatorId, validatedYearValue));
}

function removeYearValue(indicatorId, yearValueId) {
  return indicatorBusinessLogicValidator.validateRemoveYearValue(indicatorId)
    .then(() => Indicator.removeYearValue(indicatorId, yearValueId));
}

function remove(indicatorId) {
  return indicatorBusinessLogicValidator.validateRemove(indicatorId)
    .then(indicator => Indicator.remove(indicator._id));
}
