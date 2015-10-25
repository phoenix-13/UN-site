'use strict';

require('../../../config/mongoose');
var indicatorBusinessLogicValidator = require('../indicator.business.logic.validator');
var Indicator = require('../indicator.dao');
var ObjectId = require('mongoose').Types.ObjectId;
var BusinessLogicValidationError = require('../../../errors').BusinessLogicValidationError;

describe.only('indicator.business.logic.validator', () => {
  var indicator;

  beforeEach(done => {
    Indicator.removeAll()
      .then(() => Indicator.create({}))
      .then(createdIndicator => {
          indicator = createdIndicator;
          done();
        });
  });

  describe('validateUpdate', () => {
    it('should validate update', done => {
      indicatorBusinessLogicValidator.validateUpdate(indicator, {})
        .then(() => done());
    });

    it('should not validate update on nonexisting indicator', done => {
      var notExistingIndicator = { _id: new ObjectId() };
      indicatorBusinessLogicValidator.validateUpdate(notExistingIndicator, {})
        .catch(BusinessLogicValidationError, () => done());
    });
  });

  describe('validateAddYearValue', () => {
    it('should validate addYearValue', done => {
      indicatorBusinessLogicValidator.validateAddYearValue(indicator._id)
        .then(() => done());
    });

    it('should not validate update on nonexisting indicator', done => {
      var notExistingIndicator = { _id: new ObjectId() };
      indicatorBusinessLogicValidator.validateAddYearValue(notExistingIndicator, {})
        .catch(BusinessLogicValidationError, () => done());
    });
  });

  describe('validateRemoveYearValue', () => {
    it('should validate removeYearValue', done => {
      indicatorBusinessLogicValidator.validateRemoveYearValue(indicator._id)
        .then(() => done());
    });

    it('should not validate update on nonexisting indicator', done => {
      var notExistingIndicator = { _id: new ObjectId() };
      indicatorBusinessLogicValidator.validateRemoveYearValue(notExistingIndicator, {})
        .catch(BusinessLogicValidationError, () => done());
    });
  });

  describe('validateRemove', () => {
    it('should validate remove', done => {
      indicatorBusinessLogicValidator.validateRemove(indicator)
        .then(() => done());
    });

    it('should not validate remove on nonexisting indicator', done => {
      var notExistingIndicator = { _id: new ObjectId() };
      indicatorBusinessLogicValidator.validateRemove(notExistingIndicator)
        .catch(BusinessLogicValidationError, () => done());
    });
  });

});
