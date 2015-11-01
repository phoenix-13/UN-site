'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bilingStringSchema = {
  geo: String,
  eng: String
};

var yearValueSchema = {
  year: Number,
  value: Number
};

var DemographicsSchema = new Schema({
  region: bilingStringSchema,
  // title: bilingStringSchema,
  values: [yearValueSchema],
}, { collection: 'demographics' });

module.exports = mongoose.model('Demographics', DemographicsSchema);
