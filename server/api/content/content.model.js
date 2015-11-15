'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bilingStringSchema = {
  geo: { type: String, default: '' },
  eng: { type: String, default: '' }
};

var refSchema = {
  _id: Schema.Types.ObjectId,
  type: { type: String, default: '' },
  title: { type: String, default: '' }
}

var featuredSchema = {
  title: bilingStringSchema,
  ref: refSchema
};

var slideSchema = {
  title: bilingStringSchema,
  image: { type: String, default: '' },
  ref: refSchema,
  link: { type: String, default: '' }
};

var bannerSchema = {
  title: bilingStringSchema,
  image: { type: String, default: '' },
  link: { type: String, default: '' }
};

var partnerSchema = {
  name: bilingStringSchema,
  image: { type: String, default: '' },
  link: { type: String, default: '' }
};

var contactsSchema = {
  address: bilingStringSchema,
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  phones: [String],
  fax: { type: String, default: '' },
  mail: { type: String, default: '' }
};

var ContentSchema = new Schema({
  featured: [featuredSchema],
  slider: [slideSchema],
  banner: bannerSchema,
  partners: [partnerSchema],
  contacts: contactsSchema,
  about: bilingStringSchema
}, { collection: 'content' });

module.exports = mongoose.model('Content', ContentSchema);
