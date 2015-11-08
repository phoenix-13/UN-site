'use strict';

require('../../../config/mongoose');
var _ = require('lodash');
var publicationBusinessLogicValidator = require('../publication.business.logic.validator');
var Publication = require('../publication.dao');
var ObjectId = require('mongoose').Types.ObjectId;
var BusinessLogicValidationError = require('../../../errors').BusinessLogicValidationError;

describe.only('publication.business.logic.validator', () => {
  var publication;

  beforeEach(done => {
    Publication.removeAll()
      .then(() => Publication.create({}))
      .then(createdPublication => {
          publication = createdPublication;
          done();
        });
  });

  describe('validateUpdate', () => {
    it('should validate update', done => {
      publicationBusinessLogicValidator.validateUpdate(publication._id, {})
        .then(() => done());
    });

    it('should validate update and resolve with update data', done => {
      var updateData = { year: 2015 };
      publicationBusinessLogicValidator.validateUpdate(publication._id, updateData)
        .then(resolvedValue => {
          _.isEqual(resolvedValue, updateData).should.equal(true);
          done();
        });
    });

    it('should not validate update on nonexisting publication', done => {
      var notExistingPublicationId = new ObjectId();
      publicationBusinessLogicValidator.validateUpdate(notExistingPublicationId, {})
        .catch(BusinessLogicValidationError, () => done());
    });
  });

  describe('validateRemove', () => {
    it('should validate remove', done => {
      publicationBusinessLogicValidator.validateRemove(publication._id)
        .then(() => done());
    });

    it('should validate remove and resolve with publication', done => {
      publicationBusinessLogicValidator.validateRemove(publication._id)
        .then(resolvedValue => {
          resolvedValue._id.equals(publication._id).should.equal(true);
          done();
        });
    });

    it('should not validate remove on nonexisting publication', done => {
      var notExistingPublicationId = new ObjectId();
      publicationBusinessLogicValidator.validateRemove(notExistingPublicationId)
        .catch(BusinessLogicValidationError, () => done());
    });
  });

});
