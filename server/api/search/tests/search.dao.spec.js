'use strict';

require('../../../config/mongoose');
var Search = require('../search.dao');
var Indicator = require('../../indicator/indicator.dao');
var Publication = require('../../publication/publication.dao');
var Search = require('../search.dao');

describe('Search.dao', () => {
  var titleGeo = 'title';

  beforeEach(done => {
    Indicator.removeAll()
    .then(() => Publication.removeAll())
    .then(() => Indicator.create({ 'title.geo': titleGeo }, {}))
    .then(() => Publication.create({ 'title.geo': titleGeo }, { 'title.geo': titleGeo }, {}))
    .then(() => done());
  });

  describe('autocomplete', () => {
    it('should get limited results of query string search with total num of items', done => {
      var queryString = 'tl';
      var limit = 1;
      Search.autocomplete(queryString, limit)
        .then(result => {
          result.indicators.numTotal.should.equal(1);
          result.publications.numTotal.should.equal(2);
          result.indicators.items.length.should.equal(limit);
          result.publications.items.length.should.equal(limit);
          done();
        });
    });

    it('should get results with specific fields', done => {
      Search.autocomplete('ti', 1)
        .then(result => {
          result.indicators.items[0].should.have.property('_id');
          result.indicators.items[0].should.have.property('title');
          result.publications.items[0].should.have.property('_id');
          result.publications.items[0].should.have.property('title');
          done();
        });
    });
  });
});