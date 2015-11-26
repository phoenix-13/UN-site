'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var defaultString = { type: String, default: '' };

var bilingStringSchema = {
  geo: defaultString,
  eng: defaultString
};

var yearValueSchema = {
  year: Number,
  value: defaultString
};

var IndicatorSchema = new Schema({
  title: bilingStringSchema,
  date: Date,
  values: [yearValueSchema],
  content: bilingStringSchema,
  category: Schema.Types.ObjectId
}, { collection: 'indicator' });

module.exports = mongoose.model('Indicator', IndicatorSchema);
