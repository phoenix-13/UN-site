'use strict';

var _ = require('lodash');
var demographicsSchemaValidator = require('../demographics.schema.validator');
var demographicsConstants = require('../demographics.constants');
var SchemaError = require('../../../errors').SchemaError;

describe('demographics.schema.validator', () => {
  describe('validateYearValue', () => {
    var yearValue;

    beforeEach(done => {
      yearValue =  {
        year: demographicsConstants.yearMinValue,
        value: demographicsConstants.minValue
      };
      done();
    });

    it('should validate year-value', done => {
      demographicsSchemaValidator.validateYearValue(yearValue)
        .then(() => done());
    });

    it('should validate year-value and return provided schema', done => {
      demographicsSchemaValidator.validateYearValue(yearValue)
        .then(validatedYearValue => {
          _.isEqual(validatedYearValue, yearValue).should.equal(true);
          done();
        });
    });

    it('should not validate when year-value is undefined', done => {
      demographicsSchemaValidator.validateYearValue(undefined)
        .catch(SchemaError, () => done());
    });

    it('should not validate when year-value is not an object', done => {
      demographicsSchemaValidator.validateYearValue('not_an_object')
        .catch(SchemaError, () => done());
    });

    it('should not validate when year is not provided', done => {
      delete yearValue.year;
      demographicsSchemaValidator.validateYearValue(yearValue)
        .catch(SchemaError, () => done());
    });

    it('should not validate when year is not number', done => {
      yearValue.year = 'not_a_number';
      demographicsSchemaValidator.validateYearValue(yearValue)
        .catch(SchemaError, () => done());
    });

    it(`should not validate when year is less than ${demographicsConstants.yearMinValue}`, done => {
      yearValue.year = (demographicsConstants.yearMinValue - 1);
      demographicsSchemaValidator.validateYearValue(yearValue)
        .catch(SchemaError, () => done());
    });

    it(`should not validate when year is more than ${demographicsConstants.yearMaxValue}`, done => {
      yearValue.year = (demographicsConstants.yearMaxValue + 1);
      demographicsSchemaValidator.validateYearValue(yearValue)
        .catch(SchemaError, () => done());
    });

    it('should not validate when value is not provided', done => {
      delete yearValue.value;
      demographicsSchemaValidator.validateYearValue(yearValue)
        .catch(SchemaError, () => done());
    });

    it('should not validate when value is not number', done => {
      yearValue.value = 'not_a_number';
      demographicsSchemaValidator.validateYearValue(yearValue)
        .catch(SchemaError, () => done());
    });

    it(`should not validate when value is less than ${demographicsConstants.minValue}`, done => {
      yearValue.value = (demographicsConstants.minValue - 1);
      demographicsSchemaValidator.validateYearValue(yearValue)
        .catch(SchemaError, () => done());
    });

    it(`should not validate when value is more than ${demographicsConstants.maxValue}`, done => {
      yearValue.value = (demographicsConstants.maxValue + 1);
      demographicsSchemaValidator.validateYearValue(yearValue)
        .catch(SchemaError, () => done());
    });
  });

});
