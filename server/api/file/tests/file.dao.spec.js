'use strict';

require('should');
require('../../../config/mongoose');
var File = require('../file.dao');
var errors = require('../../../errors');
var DBEmptyResultError = errors.DBEmptyResultError;
var DBUnaffectedUpdateError = errors.DBUnaffectedUpdateError;
var ObjectId = require('mongoose').Types.ObjectId;

describe('File.dao', () => {
  beforeEach(done => {
    File.removeAll().then(() => done());
  });

  describe('getById', () => {
    it('should return file by id', done => {
      File.create({})
        .then(createdFile => File.getById(createdFile._id))
        .then(() => done());
    });

    it('should not return file by not existing id', done => {
      var notExistingId = new ObjectId();
      File.getById(notExistingId)
        .catch(DBEmptyResultError, () => done());
    });
  });

  describe('getAll', () => {
    it('should return empty array of files', done => {
      File.getAll()
        .then(foundFiles => {
          foundFiles.length.should.equal(0);
          done();
        });
    });

    it('should return array of files of size 1', done => {
      File.create({})
        .then(() => File.getAll())
        .then(foundFiles => {
          foundFiles.length.should.equal(1);
          done();
        });
    });
  });

  describe('create', () => {
    it('should create new file', (done) => {
      var file = { _id: new ObjectId() };
      File.create(file)
        .then(createdFile => {
          createdFile._id.equals(file._id).should.equal(true);
          done();
        });
    });
  });

  describe('remove', () => {
    var file;

    beforeEach (done => {
      File.create({ name: 'file name' })
        .then(createdFile => {
          file = createdFile;
          done();
        });
    });

    it('should remove file', done => {
      File.remove(file.name)
        .then(() => File.getById(file._id))
        .catch(DBEmptyResultError, () => done());
    });

    it('should not remove file with not existing id', done => {
      File.remove('not_existing_file')
        .catch(DBUnaffectedUpdateError, () => done());
    });
  });
});
