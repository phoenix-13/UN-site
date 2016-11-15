'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const multilingualSchema = require('../../schemas/multilingual.schema');


const locationSchema = {
  name: multilingualSchema,
  lat: Number,
  lng: Number
};

const EventSchema = new Schema({
  name: multilingualSchema,
  description: multilingualSchema,
  thumbnailUrl: String,
  fromDate: Date,
  toDate: Date,
  location: locationSchema,
  type: multilingualSchema,
  content: multilingualSchema
});

module.exports = mongoose.model('Event', EventSchema);
