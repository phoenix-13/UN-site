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

var IndicatorSchema = new Schema({
  title: bilingStringSchema,
  date: Date,
  values: [yearValueSchema],
  content: bilingStringSchema,
  category: Schema.Types.ObjectId
}, { collection: 'indicator' });

module.exports = mongoose.model('Indicator', IndicatorSchema);
