'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bilingStringSchema = {
  geo: { type: String, default: '' },
  eng: { type: String, default: '' }
};

var PublicationSchema = new Schema({
  title: bilingStringSchema,
  date: Date,
  year: Number,
  content: bilingStringSchema,
  category: Schema.Types.ObjectId
}, { collection: 'publication' });

module.exports = mongoose.model('Publication', PublicationSchema);
