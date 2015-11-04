'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bilingStringSchema = {
  geo: String,
  eng: String
};

var CategorySchema = new Schema({
  title: bilingStringSchema,
}, { collection: 'category' });

module.exports = mongoose.model('Category', CategorySchema);
