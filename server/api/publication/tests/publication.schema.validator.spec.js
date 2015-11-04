'use strict';

var _ = require('lodash');
var publicationSchemaValidator = require('../publication.schema.validator');
var publicationConstants = require('../publication.constants');
var SchemaError = require('../../../errors').SchemaError;

describe('publication.schema.validator', () => {
  describe('validatePublication', () => {
    var publication;

    beforeEach(done => {
      publication =  {
        title: biling(_.repeat('x', publicationConstants.titleMinLength)),
        date: new Date('2010/12/31'),
        content: biling('content')
      };
      done();
    });

    it('should validate publication', done => {
      publicationSchemaValidator.validatePublication(publication)
        .then(() => done());
    });

    it('should validate publication and return provided schema + year value of date', done => {
      publicationSchemaValidator.validatePublication(publication)
        .then(validatedPublication => {
          publication.year = validatedPublication.year;
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

    it(`should not validate when title geo/eng length is less than ${publicationConstants.titleMinLength}`, done => {
      publication.title.geo = _.repeat('x', publicationConstants.titleMinLength - 1);
      publicationSchemaValidator.validatePublication(publication)
        .catch(SchemaError, () => done());
    });

    it(`should not validate when title geo/eng length is more than ${publicationConstants.titleMaxLength}`, done => {
      publication.title.geo = _.repeat('x', publicationConstants.titleMaxLength + 1);
      publicationSchemaValidator.validatePublication(publication)
        .catch(SchemaError, () => done());
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

    it(`should not validate when date is not of proper '${publicationConstants.dateFormat}' format`, done => {
      publication.date = '2010-11-11';
      publicationSchemaValidator.validatePublication(publication)
        .catch(SchemaError, () => done());
    });

    it(`should not validate when date is less than '${publicationConstants.dateMinValue}'`, done => {
      publication.date = new Date(publicationConstants.dateMinValue - 1);
      publicationSchemaValidator.validatePublication(publication)
        .catch(SchemaError, () => done());
    });

    it(`should not validate when date is more than '${publicationConstants.dateMaxValue}'`, done => {
      publication.date = new Date(publicationConstants.dateMaxValue + 1);
      publicationSchemaValidator.validatePublication(publication)
        .catch(SchemaError, () => done());
    });

    it('should not validate when content is not an object', done => {
      publication.content = 'not_an_object';
      publicationSchemaValidator.validatePublication(publication)
        .catch(SchemaError, () => done());
    });

    it('should not validate when content geo/eng is not string', done => {
      publication.content.geo = {};
      publicationSchemaValidator.validatePublication(publication)
        .catch(SchemaError, () => done());
    });

    function biling(value) {
      return { geo: value, eng: value };
    }
  });
});
