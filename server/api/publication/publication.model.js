'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bilingStringSchema = {
  geo: String,
  eng: String
};

var PublicationSchema = new Schema({
  title: bilingStringSchema,
  date: Date,
  year: Number,
  description: bilingStringSchema,
  content: bilingStringSchema,
  // category: Schema.Types.ObjectId
}, { collection: 'publication' });

module.exports = mongoose.model('Publication', PublicationSchema);
