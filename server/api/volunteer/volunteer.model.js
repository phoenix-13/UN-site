'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const multilingualSchema = require('../../schemas/multilingual.schema');


const experienceSchema = {
  description: multilingualSchema,
  events: multilingualSchema
};

const languageSchema = {
  name: multilingualSchema,
  level: multilingualSchema
};

const VolunteerSchema = new Schema({
  firstName: multilingualSchema,
  lastName: multilingualSchema,
  gender: multilingualSchema,
  dateOfBirth: Date,
  address: multilingualSchema,
  region: multilingualSchema,
  education: multilingualSchema,
  email: String,
  phoneNumber: String,

  interestAreas: [multilingualSchema],

  experience: experienceSchema,

  languages: [languageSchema],
  computerPrograms: [multilingualSchema],
  about: multilingualSchema
});

module.exports = mongoose.model('Volunteer', VolunteerSchema);
