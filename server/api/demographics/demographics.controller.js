'use strict';

var Demographics = require('./demographics.dao');
var demographicsSchemaValidator = require('./demographics.schema.validator');
var demographicsBusinessLogicValidator = require('./demographics.business.logic.validator');
var demographicsParser = require('./demographics.parser');

module.exports = {
  getAll,
  updateYearValues
};

function getAll() {
  return Demographics.getAll();
}

function updateYearValues(demographicsId, yearValues) {
  var parsedYearValues = demographicsParser.parseYearValues(yearValues);
  return demographicsSchemaValidator.validateYearValues(parsedYearValues)
    .then(schemaValidatedYearValues => demographicsBusinessLogicValidator.validateUpdateYearValues(demographicsId, schemaValidatedYearValues))
    .then(validatedYearValues => Demographics.updateYearValues(demographicsId, validatedYearValues));
}
