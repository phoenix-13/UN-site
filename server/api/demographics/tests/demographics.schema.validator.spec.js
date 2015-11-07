'use strict';

var _ = require('lodash');
var demographicsSchemaValidator = require('../demographics.schema.validator');
var SchemaError = require('../../../errors').SchemaError;

describe('demographics.schema.validator', () => {
  describe('validateYearValues', () => {
    var yearValues;

    beforeEach(done => {
      yearValues = [{
        year: 2015,
        value: 100
      }];
      done();
    });

    it('should validate year-values', done => {
      demographicsSchemaValidator.validateYearValues(yearValues)
        .then(() => done());
    });

    it('should validate year-values and return provided schema', done => {
      demographicsSchemaValidator.validateYearValues(yearValues)
        .then(validatedYearValues => {
          _.isEqual(validatedYearValues, yearValues).should.equal(true);
          done();
        });
    });

    it('should not validate when year-values is undefined', done => {
      demographicsSchemaValidator.validateYearValues(undefined)
        .catch(SchemaError, () => done());
    });

    it('should not validate when year-values is not an array', done => {
      yearValues = 'not_an_array';
      demographicsSchemaValidator.validateYearValues(yearValues)
        .catch(SchemaError, () => done());
    });

    it('should not validate when year-value is not an object', done => {
      yearValues[0] = 'not_an_object';
      demographicsSchemaValidator.validateYearValues(yearValues)
        .catch(SchemaError, () => done());
    });

    it('should not validate when year is not provided', done => {
      delete yearValues[0].year;
      demographicsSchemaValidator.validateYearValues(yearValues)
        .catch(SchemaError, () => done());
    });

    it('should not validate when year is not number', done => {
      yearValues[0].year = 'not_a_number';
      demographicsSchemaValidator.validateYearValues(yearValues)
        .catch(SchemaError, () => done());
    });

    it('should not validate when value is not provided', done => {
      delete yearValues[0].value;
      demographicsSchemaValidator.validateYearValues(yearValues)
        .catch(SchemaError, () => done());
    });

    it('should not validate when value is not number', done => {
      yearValues[0].value = 'not_a_number';
      demographicsSchemaValidator.validateYearValues(yearValues)
        .catch(SchemaError, () => done());
    });
  });

});
