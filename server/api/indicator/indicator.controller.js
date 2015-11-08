'use strict';

var Q = require('bluebird');
var Indicator = require('./indicator.dao');
var indicatorSchemaValidator = require('./indicator.schema.validator');
var indicatorBusinessLogicValidator = require('./indicator.business.logic.validator');
var indicatorParser = require('./indicator.parser');
var indicatorConstants = require('./indicator.constants');

module.exports = {
  getById,
  getAll,
  getLimited,
  create,
  update,
  remove
};

function getById(indicatorId) {
  return Indicator.getById(indicatorId);
}

function getAll() {
  return Indicator.getAll();
}

function getLimited(offset) {
  var res = {};
  var limit = indicatorConstants.perPageLimit;
  return Indicator.getLimited(offset, limit)
    .then(foundIndicators => {
      res.items = foundIndicators;
      return Indicator.countAll();
    })
    .then(numTotal => {
      res.numTotal = numTotal;
      return Q.resolve(res);
    });
}

function create(indicator) {
  var parsedIndicator = indicatorParser.parseIndicator(indicator);
  return indicatorSchemaValidator.validateIndicator(parsedIndicator)
    .then(validatedIndicator => Indicator.create(validatedIndicator));
}

function update(indicatorId, data) {
  var parsedData = indicatorParser.parseIndicator(data);
  return indicatorSchemaValidator.validateIndicator(parsedData)
    .then(schemaValidatedData => indicatorBusinessLogicValidator.validateUpdate(indicatorId, schemaValidatedData))
    .then(validatedUpdateData => Indicator.update(indicatorId, validatedUpdateData));
}

function remove(indicatorId) {
  return indicatorBusinessLogicValidator.validateRemove(indicatorId)
    .then(indicator => Indicator.remove(indicator._id));
}
