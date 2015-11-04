'use strict';

require('../../../config/mongoose');
var Indicator = require('../indicator.dao');
var DBEmptyResultError = require('../../../errors').DBEmptyResultError;
var DBUnaffectedUpdateError = require('../../../errors').DBUnaffectedUpdateError;
var ObjectId = require('mongoose').Types.ObjectId;

describe('indicator.dao', () => {
  beforeEach(done => {
    Indicator.removeAll().then(() => done());
  });

  describe('getById', () => {
    it('should return indicator by id', done => {
      Indicator.create({})
        .then(createdIndicator => Indicator.getById(createdIndicator._id))
        .then(() => done());
    });

    it('should not return indicator by not existing id', done => {
      var notExistingId = new ObjectId();
      Indicator.getById(notExistingId)
        .catch(DBEmptyResultError, () => done());
    });
  });

  describe('getAll', () => {
    it('should return empty array of indicators', done => {
      Indicator.getAll()
        .then(foundIndicators => {
          foundIndicators.length.should.equal(0);
          done();
        });
    });

    it('should return array of indicators of size 1', done => {
      Indicator.create({})
        .then(() => Indicator.getAll())
        .then(foundIndicators => {
          foundIndicators.length.should.equal(1);
          done();
        });
    });
  });

  describe('getLimited', () => {
    var indicators;

    beforeEach(done => {
      indicators = [{}, {}, {}];
      Indicator.create(indicators)
        .then(createdIndicators => {
          indicators = createdIndicators;
          done();
        });
    })

    it('should return empty array of indicators', done => {
      Indicator.removeAll()
        .then(() => Indicator.getLimited(0, 1))
        .then((foundIndicators) => {
          foundIndicators.length.should.equal(0);
          done();
        });
    });

    it('should return limited amount of indicators starting from offset', done => {
      var offset = 1;
      var limit = 1;
      Indicator.getLimited(offset, limit)
        .then((foundIndicators) => {
          foundIndicators.length.should.equal(limit);
          foundIndicators[0]._id.equals(indicators[offset]._id).should.equal(true);
          done();
        });
    });
  });

  describe('create', () => {
    it('should create new indicator', (done) => {
      var indicator = { _id: new ObjectId() };
      Indicator.create(indicator)
        .then(createdIndicator => {
          createdIndicator._id.equals(indicator._id).should.equal(true);
          done();
        });
    });
  });

  describe('update', () =>  {
    it('should update indicator', (done) => {
      var indicatorId = new ObjectId();
      var updated = 'updated';
      Indicator.create({ _id: indicatorId })
        .then(() => Indicator.update(indicatorId, { 'title.geo': updated }))
        .then(() => Indicator.getById(indicatorId))
        .then(indicator => {
          indicator.title.geo.should.equal(updated);
          done();
        });
    });
  });

  describe('addYearValue', () => {
    var indicatorId;

    beforeEach(done => {
      Indicator.create({})
        .then(createdIndicator => {
          indicatorId = createdIndicator._id;
          done();
        });
    });

    it('should add year-value to indicator', done => {
      var yearValue = { _id: new ObjectId(), year: 2015, value: 99 };
      Indicator.addYearValue(indicatorId, yearValue)
        .then(() => Indicator.getById(indicatorId))
        .then(foundIndicator => {
          foundIndicator.values[0]._id.equals(yearValue._id).should.equal(true);
          done();
        });
    });

    it('should not add year-value to not existing indicator', done => {
      Indicator.addYearValue(new ObjectId(), {})
        .catch(DBUnaffectedUpdateError, () => done());
    });
  });

  describe('removeYearValue', () => {
    var indicatorId;
    var yearValue = { _id: new ObjectId(), year: 2015, value: 99 };

    beforeEach(done => {
      Indicator.create({})
        .then(createdIndicator => {
          indicatorId = createdIndicator._id;
          return Indicator.addYearValue(indicatorId, yearValue);
        })
        .then(() => done());
    });

    it('should remove year-value from indicator', done => {
      Indicator.removeYearValue(indicatorId, yearValue._id)
        .then(() => Indicator.getById(indicatorId))
        .then(foundIndicator => {
          foundIndicator.values.length.should.equal(0);
          done();
        });
    });

    it('should not remove year-value from not existing indicator', done => {
      Indicator.removeYearValue(new ObjectId(), yearValue._id)
        .catch(DBUnaffectedUpdateError, () => done());
    });
  });

  describe('remove', () => {
    var indicatorId;

    beforeEach (done => {
      Indicator.create({})
        .then(createdIndicator => {
          indicatorId = createdIndicator._id;
          done();
        });
    });

    it('should remove indicator', done => {
      Indicator.remove(indicatorId)
        .then(() => Indicator.getById(indicatorId))
        .catch(DBEmptyResultError, () => done());
    });

    it('should not remove indicator with not existing id', done => {
      Indicator.remove(new ObjectId())
        .catch(DBUnaffectedUpdateError, () => done());
    });
  });

});
