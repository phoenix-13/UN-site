'use strict';

require('should');
require('../../../config/mongoose');
var Content = require('../content.dao');
var DBEmptyResultError = require('../../../errors').DBEmptyResultError;
// var DBUnaffectedUpdateError = require('../../../errors').DBUnaffectedUpdateError;
var ObjectId = require('mongoose').Types.ObjectId;

describe('content.dao', () => {
  beforeEach(done => {
    Content.removeAll().then(() => done());
  });

  describe('getOne', () => {
    it('should return content', done => {
      Content.create({})
        .then(() => Content.getOne())
        .then(() => done());
    });

    it('should not return not existing content', done => {
      Content.getOne()
        .catch(DBEmptyResultError, () => done());
    });
  });

  describe('create', () => {
    it('should create new content', done => {
      var content = { _id: new ObjectId() };
      Content.create(content)
        .then(createdContent => {
          createdContent._id.equals(content._id).should.equal(true);
          done();
        });
    });
  });

  describe('update', () =>  {
    it('should update content', done => {
      var updateDoc = { about: {} };
      updateDoc.about.geo = 'to be updated';
      Content.create({})
        .then(() => Content.update(updateDoc))
        .then(() => Content.getOne())
        .then(content => {
          content.about.geo.should.equal(updateDoc.about.geo);
          done();
        });
    });
  });

  describe('addSlide', () =>  {
    beforeEach(done => {
      Content.create({}).then(() => done());
    });

    it('should add slide to content', done => {
      var slide = { title: {}, link: 'cink' };
      Content.addSlide(slide)
        .then(() => Content.getOne())
        .then(content => {
          content.slider.length.should.equal(1);
          content.slider[0].link.should.equal(slide.link);
          done();
        });
    });

    it('should add slide and resolve with slide doc with _id', done => {
      var slide = { link: 'cink' };
      Content.addSlide(slide)
        .then(addedSlide => {
          addedSlide.should.have.property('_id');
          done();
        });
    });
  });

  describe('updateSlide', () =>  {
    var slide = { _id: new ObjectId(), link: 'link' };

    beforeEach(done => {
      Content.create({ slider: [slide] })
      .then(() => done());
    });

    it('should update slide of content', done => {
      var updatedLink = 'updated';
      slide.link = updatedLink;
      Content.updateSlide(slide)
        .then(() => Content.getOne())
        .then(content => {
          content.slider.length.should.equal(1);
          content.slider[0].link.should.equal(updatedLink);
          done();
        });
    });
  });

  describe('removeSlide', () =>  {
    var slide = { _id: new ObjectId(), title: {} };

    beforeEach(done => {
      Content.create({})
      .then(() => Content.addSlide(slide))
      .then(() => done());
    })

    it('should remove slide from content', done => {
      Content.removeSlide(slide._id)
        .then(() => Content.getOne())
        .then(content => {
          content.slider.length.should.equal(0);
          done();
        });
    });
  });

  describe('addPartner', () =>  {
    beforeEach(done => {
      Content.create({}).then(() => done());
    })

    it('should add partner to content', done => {
      var partner = { name: {}, link: 'kink' };
      Content.addPartner(partner)
        .then(() => Content.getOne())
        .then(content => {
          content.partners.length.should.equal(1);
          content.partners[0].link.should.equal(partner.link);
          done();
        });
    });
  });

  describe('updatePartner', () =>  {
    var partner = { _id: new ObjectId(), link: 'link' };

    beforeEach(done => {
      Content.create({ partners: [partner] })
      .then(() => done());
    });

    it('should update partner of content', done => {
      var updatedLink = 'updated';
      partner.link = updatedLink;
      Content.updatePartner(partner)
        .then(() => Content.getOne())
        .then(content => {
          content.partners.length.should.equal(1);
          content.partners[0].link.should.equal(updatedLink);
          done();
        });
    });
  });

  describe('removePartner', () =>  {
    var partner = { _id: new ObjectId(), title: {} };

    beforeEach(done => {
      Content.create({})
      .then(() => Content.addPartner(partner))
      .then(() => done());
    })

    it('should remove partner from content', done => {
      Content.removePartner(partner._id)
        .then(() => Content.getOne())
        .then(content => {
          content.partners.length.should.equal(0);
          done();
        });
    });
  });

  describe('remove', () => {
    it('should remove content', done => {
      Content.create({})
        .then(() => Content.removeOne())
        .then(() => Content.getOne())
        .catch(DBEmptyResultError, () => done());
    });
  });

});
