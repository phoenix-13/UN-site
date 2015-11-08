'use strict';

require('should');
require('../../../config/mongoose');
var Publication = require('../publication.dao');
var DBEmptyResultError = require('../../../errors').DBEmptyResultError;
var DBUnaffectedUpdateError = require('../../../errors').DBUnaffectedUpdateError;
var ObjectId = require('mongoose').Types.ObjectId;

describe('publication.dao', () => {
  beforeEach(done => {
    Publication.removeAll().then(() => done());
  });

  describe('getById', () => {
    it('should return publication by id', done => {
      Publication.create({})
        .then(createdPublication => Publication.getById(createdPublication._id))
        .then(() => done());
    });

    it('should not return publication by not existing id', done => {
      var notExistingId = new ObjectId();
      Publication.getById(notExistingId)
        .catch(DBEmptyResultError, () => done());
    });
  });

  describe('getAll', () => {
    it('should return empty array of publications', done => {
      Publication.getAll()
        .then(foundPublications => {
          foundPublications.length.should.equal(0);
          done();
        });
    });

    it('should return array of publications of size 1', done => {
      Publication.create({})
        .then(() => Publication.getAll())
        .then(foundPublications => {
          foundPublications.length.should.equal(1);
          done();
        });
    });
  });

  describe('getLimited', () => {
    var publications;

    beforeEach(done => {
      publications = [{}, {}, {}];
      Publication.create(publications)
        .then(createdPublications => {
          publications = createdPublications;
          done();
        });
    })

    it('should return empty array of publications', done => {
      Publication.removeAll()
        .then(() => Publication.getLimited(0, 1))
        .then(foundPublications => {
          foundPublications.length.should.equal(0);
          done();
        });
    });

    it('should return limited amount of publications starting from offset', done => {
      var offset = 1;
      var limit = 1;
      Publication.getLimited(offset, limit)
        .then(foundPublications => {
          foundPublications.length.should.equal(limit);
          foundPublications[0]._id.equals(publications[offset]._id).should.equal(true);
          done();
        });
    });
  });

  describe('create', () => {
    it('should create new publication', (done) => {
      var publication = { _id: new ObjectId() };
      Publication.create(publication)
        .then(createdPublication => {
          createdPublication._id.equals(publication._id).should.equal(true);
          done();
        });
    });
  });

  describe('update', () =>  {
    it('should update publication', (done) => {
      var publicationId = new ObjectId();
      var updatedTitleGeo = 'updated';
      var updatedYear = 2013;
      Publication.create({ _id: publicationId, year: 2015 })
        .then(() => Publication.update(publicationId, { 'title.geo': updatedTitleGeo, 'year': updatedYear }))
        .then(() => Publication.getById(publicationId))
        .then(publication => {
          publication.title.geo.should.equal(updatedTitleGeo);
          publication.year.should.equal(updatedYear);
          done();
        });
    });
  });

  describe('remove', () => {
    var publicationId;

    beforeEach (done => {
      Publication.create({})
        .then(createdPublication => {
          publicationId = createdPublication._id;
          done();
        });
    });

    it('should remove publication', done => {
      Publication.remove(publicationId)
        .then(() => Publication.getById(publicationId))
        .catch(DBEmptyResultError, () => done());
    });

    it('should not remove publication with not existing id', done => {
      Publication.remove(new ObjectId())
        .catch(DBUnaffectedUpdateError, () => done());
    });
  });

  describe('countAll', () => {
    it('should return 0 num of publications count', done => {
      Publication.countAll()
        .then(totalNum => {
          totalNum.should.equal(0);
          done();
        });
    });

    it('should return 1 num of publications count', done => {
      Publication.create({})
        .then(() => Publication.countAll())
        .then(totalNum => {
          totalNum.should.equal(1);
          done();
        });
    });
  });
});
