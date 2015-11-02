'use strict';

require('../../../config/mongoose');
var Demographics = require('../demographics.dao');
var DBEmptyResultError = require('../../../errors').DBEmptyResultError;
var DBUnaffectedUpdateError = require('../../../errors').DBUnaffectedUpdateError;
var ObjectId = require('mongoose').Types.ObjectId;

describe('demographics.dao', () => {
  beforeEach(done => {
    Demographics.removeAll().then(() => done());
  });

  describe('getById', () => {
    it('should return demographics by id', done => {
      Demographics.create({})
        .then(createdDemographics => Demographics.getById(createdDemographics._id))
        .then(() => done());
    });

    it('should not return demographics by not existing id', done => {
      var notExistingId = new ObjectId();
      Demographics.getById(notExistingId)
        .catch(DBEmptyResultError, () => done());
    });
  });

  describe('getAll', () => {
    it('should return empty array of demographics', done => {
      Demographics.getAll()
        .then(foundDemographics => {
          foundDemographics.length.should.equal(0);
          done();
        });
    });

    it('should return array of demographics of size 1', done => {
      Demographics.create({})
        .then(() => Demographics.getAll())
        .then(foundDemographics => {
          foundDemographics.length.should.equal(1);
          done();
        });
    });
  });

  describe('create', () => {
    it('should create new demographics', done => {
      var demographics = { _id: new ObjectId() };
      Demographics.create(demographics)
        .then(createdDemographics => {
          createdDemographics._id.equals(demographics._id).should.equal(true);
          done();
        });
    });
  });

  describe('addYearValue', () => {
    var demographicsId;

    beforeEach(done => {
      Demographics.create({})
        .then(createdDemographics => {
          demographicsId = createdDemographics._id;
          done();
        });
    });

    it('should add year-value to demographics', done => {
      var yearValue = { _id: new ObjectId(), year: 2015, value: 99 };
      Demographics.addYearValue(demographicsId, yearValue)
        .then(() => Demographics.getById(demographicsId))
        .then(foundDemographics => {
          foundDemographics.values[0]._id.equals(yearValue._id).should.equal(true);
          done();
        });
    });

    it('should not add year-value to not existing demographics', done => {
      Demographics.addYearValue(new ObjectId(), {})
        .catch(DBUnaffectedUpdateError, () => done());
    });
  });

  describe('removeYearValue', () => {
    var demographicsId;
    var yearValue = { _id: new ObjectId(), year: 2015, value: 99 };

    beforeEach(done => {
      Demographics.create({})
        .then(createdDemographics => {
          demographicsId = createdDemographics._id;
          return Demographics.addYearValue(demographicsId, yearValue);
        })
        .then(() => done());
    });

    it('should remove year-value from demographics', done => {
      Demographics.removeYearValue(demographicsId, yearValue._id)
        .then(() => Demographics.getById(demographicsId))
        .then(foundDemographics => {
          foundDemographics.values.length.should.equal(0);
          done();
        });
    });

    it('should not remove year-value from not existing demographics', done => {
      Demographics.removeYearValue(new ObjectId(), yearValue._id)
        .catch(DBUnaffectedUpdateError, () => done());
    });
  });

  describe('remove', () => {
    var demographicsId;

    beforeEach (done => {
      Demographics.create({})
        .then(createdDemographics => {
          demographicsId = createdDemographics._id;
          done();
        });
    });

    it('should remove demographics', done => {
      Demographics.remove(demographicsId)
        .then(() => Demographics.getById(demographicsId))
        .catch(DBEmptyResultError, () => done());
    });

    it('should not remove demographics with not existing id', done => {
      Demographics.remove(new ObjectId())
        .catch(DBUnaffectedUpdateError, () => done());
    });
  });

});
