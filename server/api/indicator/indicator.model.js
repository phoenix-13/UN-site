'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bilingStringSchema = {
  geo: { type: String, default: '' },
  eng: { type: String, default: '' }
};

var yearValueSchema = {
  year: Number,
  value: Number
};

var IndicatorSchema = new Schema({
  title: bilingStringSchema,
  date: Date,
  values: [yearValueSchema],
  content: bilingStringSchema,
  category: Schema.Types.ObjectId
  // categories: [Schema.Types.ObjectId]
}, { collection: 'indicator' });

module.exports = mongoose.model('Indicator', IndicatorSchema);
