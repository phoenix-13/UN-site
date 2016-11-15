'use strict';

var _ = require('lodash');
var helpers = require('../helpers/stubHelpers');

var VolunteerStub = {
  firstName: getMultilingual('firstName ge', 'firstName en'),
  lastName: getMultilingual('lastName ge', 'lastName en'),
  gender: getMultilingual('gender ge', 'gender en'),
  dateOfBirth: new Date(),
  address: getMultilingual('address ge', 'address en'),
  region: getMultilingual('region ge', 'region en'),
  education: getMultilingual('education ge', 'education en'),
  email: 'stub@ygg',
  phoneNumber: '098767890',

  interestAreas: [getMultilingual('interestArea ge', 'interestArea en')],

  experience: getExperienceObj(),

  languages: [getLanguageObj()],
  computerPrograms: [getMultilingual('computerPrograms ge', 'computerPrograms en')],
  about: getMultilingual('about ge', 'about en')
};

function getExperienceObj() {
  return {
    description: getMultilingual('experience description ge', 'experience description en'),
    events: getMultilingual('experience events ge', 'experience events en')
  }
}

function getLanguageObj() {
  return {
    name: getMultilingual('language name ge', 'language name en'),
    level: getMultilingual('language level ge', 'language level en')
  }
}

function getMultilingual() {
  return { ge: arguments[0], en: arguments[1] };
}


module.exports = {
  getSingle,
  getMany
};


function getSingle() {
  var stub = helpers.cloneStub(VolunteerStub);
  return stub;
}

function getMany(count) {
  return _.range(count)
    .map((i) => {
      var stub = getSingle();
      stub.name.ge = `${stub.name.ge}_${i}`;
      return stub;
    });
}
