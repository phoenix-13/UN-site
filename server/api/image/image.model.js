'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
  fileName: String
}, { collection: 'image' });

module.exports = mongoose.model('Image', ImageSchema);
