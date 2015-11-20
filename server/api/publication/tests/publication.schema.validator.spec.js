'use strict';

var _ = require('lodash');
var publicationSchemaValidator = require('../publication.schema.validator');
var SchemaError = require('../../../errors').SchemaError;

describe('publication.schema.validator', () => {
  describe('validatePublication', () => {
    var publication;

    beforeEach(done => {
      publication =  {
        title: biling('title'),
        date: new Date('2010/12/31'),
        content: biling('content'),
        categories: ['category ID']
      };
      done();
    });

    it('should validate publication', done => {
      publicationSchemaValidator.validatePublication(publication)
        .then(() => done());
    });

    it('should validate publication and return provided schema', done => {
      publicationSchemaValidator.validatePublication(publication)
        .then(validatedPublication => {
          _.isEqual(validatedPublication, publication).should.equal(true);
          done();
        });
    });

    it('should not validate when publication is undefined', done => {
      publicationSchemaValidator.validatePublication(undefined)
        .catch(SchemaError, () => done());
    });

    it('should not validate when publication is not an object', done => {
      publicationSchemaValidator.validatePublication('not_an_object')
        .catch(SchemaError, () => done());
    });

    it('should not validate when title is not provided', done => {
      delete publication.title;
      publicationSchemaValidator.validatePublication(publication)
        .catch(SchemaError, () => done());
    });

    it('should not validate when title is not an object', done => {
      publication.title = 'not_an_object';
      publicationSchemaValidator.validatePublication(publication)
        .catch(SchemaError, () => done());
    });

    it('should not validate when title geo/eng is not provided', done => {
      delete publication.title.geo;
      publicationSchemaValidator.validatePublication(publication)
        .catch(SchemaError, () => done());
    });

    it('should not validate when title geo/eng is not string', done => {
      publication.title.geo = [];
      publicationSchemaValidator.validatePublication(publication)
        .catch(SchemaError, () => done());
    });

    it('should validate when title geo/eng is empty string', done => {
      publication.title.geo = '';
      publicationSchemaValidator.validatePublication(publication)
        .then(() => done());
    });

    it('should not validate when date is not provided', done => {
      delete publication.date;
      publicationSchemaValidator.validatePublication(publication)
        .catch(SchemaError, () => done());
    });

    it('should not validate when date is not of date type', done => {
      publication.date = 'not_a_date';
      publicationSchemaValidator.validatePublication(publication)
        .catch(SchemaError, () => done());
    });

    it('should not validate when content is not provided', done => {
      delete publication.content;
      publicationSchemaValidator.validatePublication(publication)
        .catch(SchemaError, () => done());
    });

    it('should not validate when content is not an object', done => {
      publication.content = 'not_an_object';
      publicationSchemaValidator.validatePublication(publication)
        .catch(SchemaError, () => done());
    });

    it('should not validate when content geo/eng is not provided', done => {
      delete publication.content.geo;
      publicationSchemaValidator.validatePublication(publication)
        .catch(SchemaError, () => done());
    });

    it('should not validate when content geo/eng is not string', done => {
      publication.content.geo = {};
      publicationSchemaValidator.validatePublication(publication)
        .catch(SchemaError, () => done());
    });

    it('should validate when content geo/eng is empty string', done => {
      publication.content.geo = '';
      publicationSchemaValidator.validatePublication(publication)
        .then(() => done());
    });

    it('should not validate when categories is not provided', done => {
      delete publication.categories;
      publicationSchemaValidator.validatePublication(publication)
        .catch(SchemaError, () => done());
    });

    it('should not validate when categories is not an array', done => {
      publication.categories = 'not_an_array';
      publicationSchemaValidator.validatePublication(publication)
        .catch(SchemaError, () => done());
    });

    it('should not validate when categories item is not string', done => {
      publication.categories[0] = [];
      publicationSchemaValidator.validatePublication(publication)
        .catch(SchemaError, () => done());
    });

    function biling(value) {
      return { geo: value, eng: value };
    }
  });
});
