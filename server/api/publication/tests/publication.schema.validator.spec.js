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
        date: new Date('2100/12/31'),
        year: publicationConstants.yearMaxValue,
        description: biling(_.repeat('x', publicationConstants.descriptionMaxLength)),
        content: biling('content')
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

    it('should not validate when year is not number', done => {
      publication.year = 'not_a_number';
      publicationSchemaValidator.validatePublication(publication)
        .catch(SchemaError, () => done());
    });

    it(`should not validate when year is less than ${publicationConstants.yearMinValue}`, done => {
      publication.year = publicationConstants.yearMinValue - 1;
      publicationSchemaValidator.validatePublication(publication)
        .catch(SchemaError, () => done());
    });

    it(`should not validate when year is more than ${publicationConstants.yearMaxValue}`, done => {
      publication.year = publicationConstants.yearMaxValue + 1;
      publicationSchemaValidator.validatePublication(publication)
        .catch(SchemaError, () => done());
    });

    it('should not validate when description is not an object', done => {
      publication.description = 'not_an_object';
      publicationSchemaValidator.validatePublication(publication)
        .catch(SchemaError, () => done());
    });

    it('should not validate when description geo/eng is not string', done => {
      publication.description.geo = {};
      publicationSchemaValidator.validatePublication(publication)
        .catch(SchemaError, () => done());
    });

    it(`should not validate when description geo/eng length is more than ${publicationConstants.descriptionMaxLength}`, done => {
      publication.description.geo = _.repeat('x', publicationConstants.descriptionMaxLength + 1);
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
