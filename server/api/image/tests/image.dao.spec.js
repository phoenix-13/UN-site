'use strict';

require('should');
require('../../../config/mongoose');
var ImageDao = require('../image.dao');
var errors = require('../../../errors');
var DBEmptyResultError = errors.DBEmptyResultError;
var DBUnaffectedUpdateError = errors.DBUnaffectedUpdateError;

describe('image.dao', () => {
  beforeEach(done => {
    ImageDao.removeAll().then(() => done());
  });

  describe('create', () => {
    it('should create image', done => {
      var image = { fileName: 'fileName' };
      ImageDao.create(image)
        .then(createdImage => {
          createdImage.fileName.should.equal(image.fileName);
          done();
        });
    });
  });

  describe('remove', () => {
    it('should remove image by fileName', done => {
      var image = { fileName: 'fileName' };
      ImageDao.create(image)
        .then(() => ImageDao.remove(image.fileName))
        .then(() => done());
    });

    it('should not remove image by notExistingFileName', done => {
      var notExistingFileName = 'notExistingFileName';
      ImageDao.remove(notExistingFileName)
        .catch(DBUnaffectedUpdateError, () => done());
    });
  });

  describe('imageExists', () => {
    it('should exist image with fileName', done => {
      var image = { fileName: 'fileName' };
      ImageDao.create(image)
        .then(() => ImageDao.imageExists(image.fileName))
        .then(() => done());
    });

    it('should not exist image with notExistingFileName', done => {
      ImageDao.imageExists('notExistingFileName')
        .catch(DBEmptyResultError, () => done());
    });
  });
});
