'use strict';

var _ = require('lodash');
var contentSchemaValidator = require('../content.schema.validator');
var contentConstants = require('../content.constants');
var SchemaError = require('../../../errors').SchemaError;

describe('content.schema.validator', () => {
  describe('validateFeatured', () => {
    var featured;

    beforeEach(done => {
      featured =  {
        title: biling(_.repeat('x', contentConstants.titleMinLength)),
        link: 'link'
      };
      done();
    });

    it('should validate featured', done => {
      contentSchemaValidator.validateFeatured(featured)
        .then(() => done());
    });

    it('should validate featured and return provided schema', done => {
      contentSchemaValidator.validateFeatured(featured)
        .then(validatedFeatured => {
          _.isEqual(validatedFeatured, featured).should.equal(true);
          done();
        });
    });

    it('should not validate when featured is undefined', done => {
      contentSchemaValidator.validateFeatured(undefined)
        .catch(SchemaError, () => done());
    });

    it('should not validate when featured is not an object', done => {
      contentSchemaValidator.validateFeatured('not_an_object')
        .catch(SchemaError, () => done());
    });

    it('should not validate when title is not provided', done => {
      delete featured.title;
      contentSchemaValidator.validateFeatured(featured)
        .catch(SchemaError, () => done());
    });

    it('should not validate when title is not an object', done => {
      featured.title = 'not_an_object';
      contentSchemaValidator.validateFeatured(featured)
        .catch(SchemaError, () => done());
    });

    it('should not validate when title geo/eng is not provided', done => {
      delete featured.title.geo;
      contentSchemaValidator.validateFeatured(featured)
        .catch(SchemaError, () => done());
    });

    it('should not validate when title geo/eng is not string', done => {
      featured.title.geo = [];
      contentSchemaValidator.validateFeatured(featured)
        .catch(SchemaError, () => done());
    });

    it(`should not validate when title geo/eng length is less than ${contentConstants.titleMinLength}`, done => {
      featured.title.geo = _.repeat('x', contentConstants.titleMinLength - 1);
      contentSchemaValidator.validateFeatured(featured)
        .catch(SchemaError, () => done());
    });

    it(`should not validate when title geo/eng length is more than ${contentConstants.titleMaxLength}`, done => {
      featured.title.geo = _.repeat('x', contentConstants.titleMaxLength + 1);
      contentSchemaValidator.validateFeatured(featured)
        .catch(SchemaError, () => done());
    });

    it('should not validate when link is not provided', done => {
      delete featured.link;
      contentSchemaValidator.validateFeatured(featured)
        .catch(SchemaError, () => done());
    });

    it('should not validate when link is not string', done => {
      featured.link = [];
      contentSchemaValidator.validateFeatured(featured)
        .catch(SchemaError, () => done());
    });
  });

  describe('validateSlide', () => {
    var slide;

    beforeEach(done => {
      slide =  {
        title: biling(_.repeat('x', contentConstants.titleMinLength)),
        image: 'image',
        link: 'link'
      };
      done();
    });

    it('should validate slide', done => {
      contentSchemaValidator.validateSlide(slide)
        .then(() => done());
    });

    it('should validate slide and return provided schema', done => {
      contentSchemaValidator.validateSlide(slide)
        .then(validatedSlide => {
          _.isEqual(validatedSlide, slide).should.equal(true);
          done();
        });
    });

    it('should not validate when slide is undefined', done => {
      contentSchemaValidator.validateSlide(undefined)
        .catch(SchemaError, () => done());
    });

    it('should not validate when slide is not an object', done => {
      contentSchemaValidator.validateSlide('not_an_object')
        .catch(SchemaError, () => done());
    });

    it('should not validate when title is not provided', done => {
      delete slide.title;
      contentSchemaValidator.validateSlide(slide)
        .catch(SchemaError, () => done());
    });

    it('should not validate when title is not an object', done => {
      slide.title = 'not_an_object';
      contentSchemaValidator.validateSlide(slide)
        .catch(SchemaError, () => done());
    });

    it('should not validate when title geo/eng is not provided', done => {
      delete slide.title.geo;
      contentSchemaValidator.validateSlide(slide)
        .catch(SchemaError, () => done());
    });

    it('should not validate when title geo/eng is not string', done => {
      slide.title.geo = [];
      contentSchemaValidator.validateSlide(slide)
        .catch(SchemaError, () => done());
    });

    it(`should not validate when title geo/eng length is less than ${contentConstants.titleMinLength}`, done => {
      slide.title.geo = _.repeat('x', contentConstants.titleMinLength - 1);
      contentSchemaValidator.validateSlide(slide)
        .catch(SchemaError, () => done());
    });

    it(`should not validate when title geo/eng length is more than ${contentConstants.titleMaxLength}`, done => {
      slide.title.geo = _.repeat('x', contentConstants.titleMaxLength + 1);
      contentSchemaValidator.validateSlide(slide)
        .catch(SchemaError, () => done());
    });

    it('should not validate when image is not provided', done => {
      delete slide.image;
      contentSchemaValidator.validateSlide(slide)
        .catch(SchemaError, () => done());
    });

    it('should not validate when image is not string', done => {
      slide.image = [];
      contentSchemaValidator.validateSlide(slide)
        .catch(SchemaError, () => done());
    });

    it('should not validate when link is not string', done => {
      slide.link = {};
      contentSchemaValidator.validateSlide(slide)
        .catch(SchemaError, () => done());
    });
  });

  describe('validateBanner', () => {
    var banner;

    beforeEach(done => {
      banner =  {
        image: 'image',
        link: 'link'
      };
      done();
    });

    it('should validate banner', done => {
      contentSchemaValidator.validateBanner(banner)
        .then(() => done());
    });

    it('should validate banner and return provided schema', done => {
      contentSchemaValidator.validateBanner(banner)
        .then(validatedBanner => {
          _.isEqual(validatedBanner, banner).should.equal(true);
          done();
        });
    });

    it('should not validate when banner is undefined', done => {
      contentSchemaValidator.validateBanner(undefined)
        .catch(SchemaError, () => done());
    });

    it('should not validate when banner is not an object', done => {
      contentSchemaValidator.validateBanner('not_an_object')
        .catch(SchemaError, () => done());
    });

    it('should not validate when image is not provided', done => {
      delete banner.image;
      contentSchemaValidator.validateBanner(banner)
        .catch(SchemaError, () => done());
    });

    it('should not validate when image is not string', done => {
      banner.image = {};
      contentSchemaValidator.validateBanner(banner)
        .catch(SchemaError, () => done());
    });

    it('should not validate when link is not string', done => {
      banner.link = [];
      contentSchemaValidator.validateBanner(banner)
        .catch(SchemaError, () => done());
    });
  });

  describe('validatePartner', () => {
    var partner;

    beforeEach(done => {
      partner =  {
        name: biling(_.repeat('x', contentConstants.nameMinLength)),
        image: 'image',
        link: 'link'
      };
      done();
    });

    it('should validate partner', done => {
      contentSchemaValidator.validatePartner(partner)
        .then(() => done());
    });

    it('should validate partner and return provided schema', done => {
      contentSchemaValidator.validatePartner(partner)
        .then(validatedPartner => {
          _.isEqual(validatedPartner, partner).should.equal(true);
          done();
        });
    });

    it('should not validate when partner is undefined', done => {
      contentSchemaValidator.validatePartner(undefined)
        .catch(SchemaError, () => done());
    });

    it('should not validate when partner is not an object', done => {
      contentSchemaValidator.validatePartner('not_an_object')
        .catch(SchemaError, () => done());
    });

    it('should not validate when name is not an object', done => {
      partner.name = 'not_an_object';
      contentSchemaValidator.validatePartner(partner)
        .catch(SchemaError, () => done());
    });

    it('should not validate when name geo/eng is not string', done => {
      partner.name.geo = [];
      contentSchemaValidator.validatePartner(partner)
        .catch(SchemaError, () => done());
    });

    it(`should not validate when name geo/eng length is less than ${contentConstants.nameMinLength}`, done => {
      partner.name.geo = _.repeat('x', contentConstants.nameMinLength - 1);
      contentSchemaValidator.validatePartner(partner)
        .catch(SchemaError, () => done());
    });

    it(`should not validate when name geo/eng length is more than ${contentConstants.nameMaxLength}`, done => {
      partner.name.geo = _.repeat('x', contentConstants.nameMaxLength + 1);
      contentSchemaValidator.validatePartner(partner)
        .catch(SchemaError, () => done());
    });

    it('should not validate when image is not provided', done => {
      delete partner.image;
      contentSchemaValidator.validatePartner(partner)
        .catch(SchemaError, () => done());
    });

    it('should not validate when image is not string', done => {
      partner.image = [];
      contentSchemaValidator.validatePartner(partner)
        .catch(SchemaError, () => done());
    });

    it('should not validate when link is not string', done => {
      partner.link = {};
      contentSchemaValidator.validatePartner(partner)
        .catch(SchemaError, () => done());
    });
  });

  describe('validateContacts', () => {
    var contacts;

    beforeEach(done => {
      contacts =  {
        address: biling(_.repeat('x', contentConstants.addressMinLength)),
        coordinates: {
          latitude: 41.72,
          longitude: 44.76
        },
        phones: ['phone'],
        fax: 'fax',
        mail: 'random@gmail.com'
      };
      done();
    });

    it('should validate contacts', done => {
      contentSchemaValidator.validateContacts(contacts)
        .then(() => done());
    });

    it('should validate contacts and return provided schema', done => {
      contentSchemaValidator.validateContacts(contacts)
        .then(validatedContacts => {
          _.isEqual(validatedContacts, contacts).should.equal(true);
          done();
        });
    });

    it('should not validate when contacts is undefined', done => {
      contentSchemaValidator.validateContacts(undefined)
        .catch(SchemaError, () => done());
    });

    it('should not validate when contacts is not an object', done => {
      contentSchemaValidator.validateContacts('not_an_object')
        .catch(SchemaError, () => done());
    });

    it('should not validate when address is not an object', done => {
      contacts.address = 'not_an_object';
      contentSchemaValidator.validateContacts(contacts)
        .catch(SchemaError, () => done());
    });

    it('should not validate when address geo/eng is not string', done => {
      contacts.address.geo = [];
      contentSchemaValidator.validateContacts(contacts)
        .catch(SchemaError, () => done());
    });

    it(`should not validate when address geo/eng length is less than ${contentConstants.addressMinLength}`, done => {
      contacts.address.geo = _.repeat('x', contentConstants.addressMinLength - 1);
      contentSchemaValidator.validateContacts(contacts)
        .catch(SchemaError, () => done());
    });

    it(`should not validate when address geo/eng length is more than ${contentConstants.addressMaxLength}`, done => {
      contacts.address.geo = _.repeat('x', contentConstants.addressMaxLength + 1);
      contentSchemaValidator.validateContacts(contacts)
        .catch(SchemaError, () => done());
    });

    it('should not validate when coordinates is not provided', done => {
      delete contacts.coordinates;
      contentSchemaValidator.validateContacts(contacts)
        .catch(SchemaError, () => done());
    });

    it('should not validate when coordinates is not an object', done => {
      contacts.coordinates = 'not_an_object';
      contentSchemaValidator.validateContacts(contacts)
        .catch(SchemaError, () => done());
    });

    it('should not validate when coordinates latitude is not provided', done => {
      delete contacts.coordinates.latitude;
      contentSchemaValidator.validateContacts(contacts)
        .catch(SchemaError, () => done());
    });

    it('should not validate when coordinates latitude is not number', done => {
      contacts.coordinates.latitude = 'not_a_number';
      contentSchemaValidator.validateContacts(contacts)
        .catch(SchemaError, () => done());
    });

    it('should not validate when coordinates longitude is not provided', done => {
      delete contacts.coordinates.longitude;
      contentSchemaValidator.validateContacts(contacts)
        .catch(SchemaError, () => done());
    });

    it('should not validate when coordinates longitude is not number', done => {
      contacts.coordinates.longitude = 'not_a_number';
      contentSchemaValidator.validateContacts(contacts)
        .catch(SchemaError, () => done());
    });

    it('should not validate when phones is not array', done => {
      contacts.phones = 'not_an_array';
      contentSchemaValidator.validateContacts(contacts)
        .catch(SchemaError, () => done());
    });

    it('should not validate when phones item is not string', done => {
      contacts.phones.push([]);
      contentSchemaValidator.validateContacts(contacts)
        .then(SchemaError, () => done());
    });

    it('should not validate when fax is not string', done => {
      contacts.fax = [];
      contentSchemaValidator.validateContacts(contacts)
        .catch(SchemaError, () => done());
    });

    it('should not validate when mail is not string', done => {
      contacts.mail = {};
      contentSchemaValidator.validateContacts(contacts)
        .catch(SchemaError, () => done());
    });

    it('should not validate when mail is not of proper format', done => {
      contacts.mail = 'not_proper_foramt';
      contentSchemaValidator.validateContacts(contacts)
        .catch(SchemaError, () => done());
    });
  });

  describe('validateAbout', () => {
    var about;

    beforeEach(done => {
      about = biling(_.repeat('x', contentConstants.aboutMinLength));
      done();
    });

    it('should validate about', done => {
      contentSchemaValidator.validateAbout(about)
        .then(() => done());
    });

    it('should validate about and return provided schema', done => {
      contentSchemaValidator.validateAbout(about)
        .then(validatedAbout => {
          _.isEqual(validatedAbout, about).should.equal(true);
          done();
        });
    });

    it('should not validate when about is undefined', done => {
      contentSchemaValidator.validateAbout(undefined)
        .catch(SchemaError, () => done());
    });

    it('should not validate when about is not an object', done => {
      about = 'not_an_array';
      contentSchemaValidator.validateAbout(about)
        .catch(SchemaError, () => done());
    });

    it('should not validate when about geo/eng is not string', done => {
      about.geo = [];
      contentSchemaValidator.validateAbout(about)
        .catch(SchemaError, () => done());
    });

    it(`should not validate when about geo/eng length is less than ${contentConstants.aboutMinLength}`, done => {
      about.geo = _.repeat('x', contentConstants.aboutMinLength - 1);
      contentSchemaValidator.validateAbout(about)
        .catch(SchemaError, () => done());
    });

    it(`should not validate when about geo/eng length is more than ${contentConstants.aboutMaxLength}`, done => {
      about.geo = _.repeat('x', contentConstants.aboutMaxLength + 1);
      contentSchemaValidator.validateAbout(about)
        .catch(SchemaError, () => done());
    });
  });

    function biling(value) {
      return { geo: value, eng: value };
    }
});
