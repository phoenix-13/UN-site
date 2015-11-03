'use strict';

require('../../../config/mongoose');
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

  describe('validateAddYearValue', () => {
    it('should validate addYearValue', done => {
      demographicsBusinessLogicValidator.validateAddYearValue(demographics._id)
        .then(() => done());
    });

    it('should validate addYearValue and resolve with demographics', done => {
      demographicsBusinessLogicValidator.validateAddYearValue(demographics._id)
        .then(resolvedValue => {
          resolvedValue._id.equals(demographics._id).should.equal(true);
          done();
        });
    });

    it('should not validate addYearValue on nonexisting demographics', done => {
      var notExistingDemographics = { _id: new ObjectId() };
      demographicsBusinessLogicValidator.validateAddYearValue(notExistingDemographics._id, {})
        .catch(BusinessLogicValidationError, () => done());
    });
  });


  describe('validateRemoveYearValue', () => {
    it('should validate removeYearValue', done => {
      demographicsBusinessLogicValidator.validateRemoveYearValue(demographics._id)
        .then(() => done());
    });

    it('should validate removeYearValue and resolve with demographics', done => {
      demographicsBusinessLogicValidator.validateRemoveYearValue(demographics._id)
        .then(resolvedValue => {
          resolvedValue._id.equals(demographics._id).should.equal(true);
          done();
        });
    });

    it('should not validate removeYearValue on nonexisting demographics', done => {
      var notExistingDemographics = { _id: new ObjectId() };
      demographicsBusinessLogicValidator.validateRemoveYearValue(notExistingDemographics._id, {})
        .catch(BusinessLogicValidationError, () => done());
    });
  });

  describe('validateRemove', () => {
    it('should validate remove', done => {
      demographicsBusinessLogicValidator.validateRemove(demographics)
        .then(() => done());
    });

    it('should validate remove and resolve with demographics', done => {
      demographicsBusinessLogicValidator.validateAddYearValue(demographics._id)
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
