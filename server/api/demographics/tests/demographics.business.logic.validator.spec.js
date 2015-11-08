'use strict';

require('../../../config/mongoose');
var _ = require('lodash');
var demographicsBusinessLogicValidator = require('../demographics.business.logic.validator');
var Demographics = require('../demographics.dao');
var ObjectId = require('mongoose').Types.ObjectId;
var BusinessLogicValidationError = require('../../../errors').BusinessLogicValidationError;

describe('demographics.business.logic.validator', () => {
  var demographics;

  beforeEach(done => {
    Demographics.removeAll()
      .then(() => Demographics.create({}))
      .then(createdDemographics => {
          demographics = createdDemographics;
          done();
        });
  });

  describe('validateUpdateYearValues', () => {
    it('should validate updateYearValues', done => {
      demographicsBusinessLogicValidator.validateUpdateYearValues(demographics._id, {})
        .then(() => done());
    });

    it('should validate updateYearValues and resolve with year-values', done => {
      var yearValues = [{ _id: new ObjectId() }];
      demographicsBusinessLogicValidator.validateUpdateYearValues(demographics._id, yearValues)
        .then(resolvedValue => {
          _.isEqual(resolvedValue, yearValues).should.equal(true);
          done();
        });
    });

    it('should not validate updateYearValues on nonexisting demographics', done => {
      var notExistingDemographics = { _id: new ObjectId() };
      demographicsBusinessLogicValidator.validateUpdateYearValues(notExistingDemographics._id, {})
        .catch(BusinessLogicValidationError, () => done());
    });
  });

  describe('validateRemove', () => {
    it('should validate remove', done => {
      demographicsBusinessLogicValidator.validateRemove(demographics)
        .then(() => done());
    });

    it('should validate remove and resolve with demographics', done => {
      demographicsBusinessLogicValidator.validateRemove(demographics)
        .then(resolvedValue => {
          resolvedValue._id.equals(demographics._id).should.equal(true);
          done();
        });
    });

    it('should not validate remove on nonexisting demographics', done => {
      var notExistingDemographics = { _id: new ObjectId() };
      demographicsBusinessLogicValidator.validateRemove(notExistingDemographics)
        .catch(BusinessLogicValidationError, () => done());
    });
  });

});
