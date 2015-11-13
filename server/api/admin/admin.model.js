'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminSchema = new Schema({
  name: String,
  hashedPassword: String
}, { collection: 'admin' });

AdminSchema.virtual('id').get(function() {
  this._id.toHexString();
});
AdminSchema.virtual('role').get(function() {
  return 'admin';
});
AdminSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Admin', AdminSchema);
