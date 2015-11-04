'use strict';

require('should');
require('../../../config/mongoose');
var Category = require('../category.dao');
var DBEmptyResultError = require('../../../errors').DBEmptyResultError;
var ObjectId = require('mongoose').Types.ObjectId;

describe.only('Category.dao', () => {
  beforeEach(done => {
    Category.removeAll().then(() => done());
  });

  describe('getById', () => {
    it('should return category by id', done => {
      Category.create({})
        .then(createdCategory => Category.getById(createdCategory._id))
        .then(() => done());
    });

    it('should not return category by not existing id', done => {
      var notExistingId = new ObjectId();
      Category.getById(notExistingId)
        .catch(DBEmptyResultError, () => done());
    });
  });

  describe('getAll', () => {
    it('should return empty array of categories', done => {
      Category.getAll()
        .then(foundCategories => {
          foundCategories.length.should.equal(0);
          done();
        });
    });

    it('should return array of categories of size 1', done => {
      Category.create({})
        .then(() => Category.getAll())
        .then(foundCategories => {
          foundCategories.length.should.equal(1);
          done();
        });
    });
  });

  describe('create', () => {
    it('should create new category', (done) => {
      var category = { _id: new ObjectId() };
      Category.create(category)
        .then(createdCategory => {
          createdCategory._id.equals(category._id).should.equal(true);
          done();
        });
    });
  });
});
