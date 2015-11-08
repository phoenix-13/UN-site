'use strict';

require('../../../config/mongoose');
var _ = require('lodash');
var indicatorBusinessLogicValidator = require('../indicator.business.logic.validator');
var Indicator = require('../indicator.dao');
var ObjectId = require('mongoose').Types.ObjectId;
var BusinessLogicValidationError = require('../../../errors').BusinessLogicValidationError;

describe('indicator.business.logic.validator', () => {
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
      indicatorBusinessLogicValidator.validateUpdate(indicator._id, {})
        .then(() => done());
    });

    it('should validate update and resolve with update data', done => {
      var updateData = { category: 'new category ID' };
      indicatorBusinessLogicValidator.validateUpdate(indicator._id, updateData)
        .then(resolvedValue => {
          _.isEqual(resolvedValue, updateData).should.equal(true);
          done();
        });
    });

    it('should not validate update on nonexisting indicator', done => {
      var notExistingIndicatorId = new ObjectId();
      indicatorBusinessLogicValidator.validateUpdate(notExistingIndicatorId, {})
        .catch(BusinessLogicValidationError, () => done());
    });
  });

  describe('validateRemove', () => {
    it('should validate remove', done => {
      indicatorBusinessLogicValidator.validateRemove(indicator._id)
        .then(() => done());
    });

    it('should validate remove and resolve with indicator', done => {
      indicatorBusinessLogicValidator.validateRemove(indicator._id)
        .then(resolvedValue => {
          resolvedValue._id.equals(indicator._id).should.equal(true);
          done();
        });
    });

    it('should not validate remove on nonexisting indicator', done => {
      var notExistingIndicatorId = new ObjectId();
      indicatorBusinessLogicValidator.validateRemove(notExistingIndicatorId)
        .catch(BusinessLogicValidationError, () => done());
    });
  });

});
