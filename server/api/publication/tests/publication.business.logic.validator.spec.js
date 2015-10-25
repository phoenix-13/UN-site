'use strict';

require('../../../config/mongoose');
var publicationBusinessLogicValidator = require('../publication.business.logic.validator');
var Publication = require('../publication.dao');
var ObjectId = require('mongoose').Types.ObjectId;
var BusinessLogicValidationError = require('../../../errors').BusinessLogicValidationError;

describe('publication.business.logic.validator', () => {
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
      publicationBusinessLogicValidator.validateUpdate(publication, {})
        .then(() => done());
    });

    it('should not validate update on nonexisting publication', done => {
      var notExistingPublication = { _id: new ObjectId() };
      publicationBusinessLogicValidator.validateUpdate(notExistingPublication, {})
        .catch(BusinessLogicValidationError, () => done());
    });
  });

  describe('validateRemove', () => {
    it('should validate remove', done => {
      publicationBusinessLogicValidator.validateRemove(publication)
        .then(() => done());
    });

    it('should not validate remove on nonexisting publication', done => {
      var notExistingPublication = { _id: new ObjectId() };
      publicationBusinessLogicValidator.validateRemove(notExistingPublication)
        .catch(BusinessLogicValidationError, () => done());
    });
  });

});
