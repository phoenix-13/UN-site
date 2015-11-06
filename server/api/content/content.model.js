'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bilingStringSchema = {
  geo: { type: String, default: '' },
  eng: { type: String, default: '' }
};

var featuredSchema = {
  title: bilingStringSchema,
  link: String,
};

var slideSchema = {
  title: bilingStringSchema,
  image: String,
  link: String
};

var bannerSchema = {
  image: String,
  link: String
};

var partnerSchema = {
  name: bilingStringSchema,
  image: String,
  link: String
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
