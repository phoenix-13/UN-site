'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FileSchema = new Schema({
  name: String
}, { collection: 'file' });

module.exports = mongoose.model('File', FileSchema);
