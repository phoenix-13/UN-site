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
      var updatedTitleGeo = 'updated';
      var updatedValues = [{ _id: new ObjectId(), year: 2013, value: 3102 }];
      Indicator.create({ _id: indicatorId, values: [{ year: 2015, value: 123 }] })
        .then(() => Indicator.update(indicatorId, { 'title.geo': updatedTitleGeo, values: updatedValues }))
        .then(() => Indicator.getById(indicatorId))
        .then(indicator => {
          indicator.values[0]._id.equals(updatedValues[0]._id).should.equal(true);
          indicator.title.geo.should.equal(updatedTitleGeo);
          done();
        });
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

  describe('countAll', () => {
    it('should return 0 num of indicators count', done => {
      Indicator.countAll()
        .then(totalNum => {
          totalNum.should.equal(0);
          done();
        });
    });

    it('should return 1 num of indicators count', done => {
      Indicator.create({})
        .then(() => Indicator.countAll())
        .then(totalNum => {
          totalNum.should.equal(1);
          done();
        });
    });
  });
});
