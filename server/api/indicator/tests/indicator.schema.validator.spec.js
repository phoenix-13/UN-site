'use strict';

var _ = require('lodash');
var indicatorSchemaValidator = require('../indicator.schema.validator');
var indicatorConstants = require('../indicator.constants');
var SchemaError = require('../../../errors').SchemaError;

describe('indicator.schema.validator', () => {
  describe('validateIndicator', () => {
    var indicator;

    beforeEach(done => {
      indicator =  {
        title: biling(_.repeat('x', indicatorConstants.titleMinLength)),
        date: new Date('2100/12/31'),
        values: [
          {
            year: indicatorConstants.yearMinValue,
            value: indicatorConstants.minValue
          }
        ],
        content: biling('content')
      };
      done();
    });

    it('should validate indicator', done => {
      indicatorSchemaValidator.validateIndicator(indicator)
        .then(() => done());
    });

    it('should validate indicator and return provided schema', done => {
      indicatorSchemaValidator.validateIndicator(indicator)
        .then(validatedIndicator => {
          _.isEqual(validatedIndicator, indicator).should.equal(true);
          done();
        });
    });

    it('should not validate when indicator is undefined', done => {
      indicatorSchemaValidator.validateIndicator(undefined)
        .catch(SchemaError, () => done());
    });

    it('should not validate when indicator is not an object', done => {
      indicatorSchemaValidator.validateIndicator('not_an_object')
        .catch(SchemaError, () => done());
    });

    it('should not validate when title is not provided', done => {
      delete indicator.title;
      indicatorSchemaValidator.validateIndicator(indicator)
        .catch(SchemaError, () => done());
    });

    it('should not validate when title is not an object', done => {
      indicator.title = 'not_an_object';
      indicatorSchemaValidator.validateIndicator(indicator)
        .catch(SchemaError, () => done());
    });

    it('should not validate when title geo/eng is not provided', done => {
      delete indicator.title.geo;
      indicatorSchemaValidator.validateIndicator(indicator)
        .catch(SchemaError, () => done());
    });

    it('should not validate when title geo/eng is not string', done => {
      indicator.title.geo = [];
      indicatorSchemaValidator.validateIndicator(indicator)
        .catch(SchemaError, () => done());
    });

    it(`should not validate when title geo/eng length is less than ${indicatorConstants.titleMinLength}`, done => {
      indicator.title.geo = _.repeat('x', indicatorConstants.titleMinLength - 1);
      indicatorSchemaValidator.validateIndicator(indicator)
        .catch(SchemaError, () => done());
    });

    it(`should not validate when title geo/eng length is more than ${indicatorConstants.titleMaxLength}`, done => {
      indicator.title.geo = _.repeat('x', indicatorConstants.titleMaxLength + 1);
      indicatorSchemaValidator.validateIndicator(indicator)
        .catch(SchemaError, () => done());
    });

    it('should not validate when date is not of date type', done => {
      indicator.date = 'not_a_date';
      indicatorSchemaValidator.validateIndicator(indicator)
        .catch(SchemaError, () => done());
    });

    it(`should not validate when date is not of proper '${indicatorConstants.dateFormat}' format`, done => {
      indicator.date = '2010-11-11';
      indicatorSchemaValidator.validateIndicator(indicator)
        .catch(SchemaError, () => done());
    });

    it('should not validate when values is not array', done => {
      indicator.values = 'not_an_array';
      indicatorSchemaValidator.validateIndicator(indicator)
        .catch(SchemaError, () => done());
    });

    it(`should not validate when values year is not number`, done => {
      var invalidYearValue = { year: 'not_a_number', value: indicatorConstants.minValue };
      indicator.values.push(invalidYearValue);
      indicatorSchemaValidator.validateIndicator(indicator)
        .catch(SchemaError, () => done());
    });

    it(`should not validate when values year is less than ${indicatorConstants.yearMinValue}`, done => {
      var invalidYearValue = { year: (indicatorConstants.yearMinValue - 1), value: indicatorConstants.minValue };
      indicator.values.push(invalidYearValue);
      indicatorSchemaValidator.validateIndicator(indicator)
        .catch(SchemaError, () => done());
    });

    it(`should not validate when values year is more than ${indicatorConstants.yearMaxValue}`, done => {
      var invalidYearValue = { year: (indicatorConstants.yearMaxValue + 1), value: indicatorConstants.minValue };
      indicator.values.push(invalidYearValue);
      indicatorSchemaValidator.validateIndicator(indicator)
        .catch(SchemaError, () => done());
    });

    it(`should not validate when values value is not number`, done => {
      var invalidYearValue = { year: indicatorConstants.yearMinValue, value: 'not_a_number' };
      indicator.values.push(invalidYearValue);
      indicatorSchemaValidator.validateIndicator(indicator)
        .catch(SchemaError, () => done());
    });

    it(`should not validate when values value is less than ${indicatorConstants.minValue}`, done => {
      var invalidYearValue = { year: indicatorConstants.yearMinValue, value: (indicatorConstants.minValue - 1) };
      indicator.values.push(invalidYearValue);
      indicatorSchemaValidator.validateIndicator(indicator)
        .catch(SchemaError, () => done());
    });

    it(`should not validate when values value is more than ${indicatorConstants.maxValue}`, done => {
      var invalidYearValue = { year: indicatorConstants.yearMinValue, value: (indicatorConstants.maxValue + 1) };
      indicator.values.push(invalidYearValue);
      indicatorSchemaValidator.validateIndicator(indicator)
        .catch(SchemaError, () => done());
    });

    it('should not validate when content is not an object', done => {
      indicator.content = 'not_an_object';
      indicatorSchemaValidator.validateIndicator(indicator)
        .catch(SchemaError, () => done());
    });

    it('should not validate when content geo/eng is not string', done => {
      indicator.content.geo = {};
      indicatorSchemaValidator.validateIndicator(indicator)
        .catch(SchemaError, () => done());
    });

    function biling(value) {
      return { geo: value, eng: value };
    }
  });
});
