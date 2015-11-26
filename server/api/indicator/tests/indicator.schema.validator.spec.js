'use strict';

var _ = require('lodash');
var indicatorSchemaValidator = require('../indicator.schema.validator');
var SchemaError = require('../../../errors').SchemaError;

describe('indicator.schema.validator', () => {
  describe('validateIndicator', () => {
    var indicator;

    beforeEach(done => {
      indicator =  {
        title: biling('title'),
        date: new Date('2100/12/31'),
        values: [
          {
            year: 2015,
            value: '1331'
          }
        ],
        content: biling('content'),
        category: 'category ID'
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

    it('should validate when title geo/eng is empty string', done => {
      indicator.title.geo = '';
      indicatorSchemaValidator.validateIndicator(indicator)
        .then(() => done());
    });

    it('should not validate when date is not provided', done => {
      delete indicator.date;
      indicatorSchemaValidator.validateIndicator(indicator)
        .catch(SchemaError, () => done());
    });

    it('should not validate when date is not of date type', done => {
      indicator.date = 'not_a_date';
      indicatorSchemaValidator.validateIndicator(indicator)
        .catch(SchemaError, () => done());
    });

    it('should not validate when values is not provided', done => {
      delete indicator.values;
      indicatorSchemaValidator.validateIndicator(indicator)
        .catch(SchemaError, () => done());
    });

    it('should not validate when values is not an array', done => {
      indicator.values = 'not_an_array';
      indicatorSchemaValidator.validateIndicator(indicator)
        .catch(SchemaError, () => done());
    });

    it('should not validate when values year is not provided', done => {
      var withoutYear = { value: 13 };
      indicator.values.push(withoutYear);
      indicatorSchemaValidator.validateIndicator(indicator)
        .catch(SchemaError, () => done());
    });

    it('should not validate when values year is not number', done => {
      var invalidYearValue = { year: 'not_a_number', value: 31 };
      indicator.values.push(invalidYearValue);
      indicatorSchemaValidator.validateIndicator(indicator)
        .catch(SchemaError, () => done());
    });

    it('should not validate when values value is not provided', done => {
      var withoutValue = { year: 2020 };
      indicator.values.push(withoutValue);
      indicatorSchemaValidator.validateIndicator(indicator)
        .catch(SchemaError, () => done());
    });

    it('should not validate when values value is not string', done => {
      var invalidYearValue = { year: 2020, value: [] };
      indicator.values.push(invalidYearValue);
      indicatorSchemaValidator.validateIndicator(indicator)
        .catch(SchemaError, () => done());
    });

    it('should validate when values value is empty string', done => {
      var validYearValue = { year: 2020, value: '' };
      indicator.values.push(validYearValue);
      indicatorSchemaValidator.validateIndicator(indicator)
        .then(() => done());
    });

    it('should not validate when content is not provided', done => {
      delete indicator.content;
      indicatorSchemaValidator.validateIndicator(indicator)
        .catch(SchemaError, () => done());
    });

    it('should not validate when content is not an object', done => {
      indicator.content = 'not_an_object';
      indicatorSchemaValidator.validateIndicator(indicator)
        .catch(SchemaError, () => done());
    });

    it('should not validate when content geo/eng is not provided', done => {
      delete indicator.content.geo;
      indicatorSchemaValidator.validateIndicator(indicator)
        .catch(SchemaError, () => done());
    });

    it('should not validate when content geo/eng is not string', done => {
      indicator.content.geo = {};
      indicatorSchemaValidator.validateIndicator(indicator)
        .catch(SchemaError, () => done());
    });

    it('should not validate when category is not provided', done => {
      delete indicator.category;
      indicatorSchemaValidator.validateIndicator(indicator)
        .catch(SchemaError, () => done());
    });

    it('should not validate when category is not string', done => {
      indicator.category = [];
      indicatorSchemaValidator.validateIndicator(indicator)
        .catch(SchemaError, () => done());
    });

    function biling(value) {
      return { geo: value, eng: value };
    }
  });
});
