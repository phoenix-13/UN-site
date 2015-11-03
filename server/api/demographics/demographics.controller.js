'use strict';

var Demographics = require('./demographics.dao');
var demographicsSchemaValidator = require('./demographics.schema.validator');
var demographicsBusinessLogicValidator = require('./demographics.business.logic.validator');
var demographicsParser = require('./demographics.parser');

module.exports = {
  getAll,
  addYearValue,
  removeYearValue
};

function getAll() {
  return Demographics.getAll();
}

function addYearValue(demographicsId, yearValue) {
  var parsedYearValue = demographicsParser.parseYearValue(yearValue);
  return demographicsSchemaValidator.validateYearValue(parsedYearValue)
    .then(schemaValidatedYearValue => demographicsBusinessLogicValidator.validateAddYearValue(demographicsId, schemaValidatedYearValue))
    .then(validatedYearValue => Demographics.addYearValue(demographicsId, validatedYearValue));
}

function removeYearValue(demographicsId, yearValueId) {
  return demographicsBusinessLogicValidator.validateRemoveYearValue(demographicsId)
    .then(() => Demographics.removeYearValue(demographicsId, yearValueId));
}
