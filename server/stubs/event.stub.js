'use strict';

var _ = require('lodash');
var helpers = require('../helpers/stubHelpers');

var ServiceStub = {
  name: getMultilingual('name ge', 'name en'),
  description: getMultilingual('description ge', 'description en'),
  thumbnailUrl: 'https://99designs.com/blog/wp-content/uploads/2013/04/daft-punk-youredm.jpg',
  fromDate: new Date(),
  toDate: new Date(),
  location: getLocationObj(),
  type: getMultilingual('type ge', 'type en'),
  content: getMultilingual('content ge', 'content en')
};

function getLocationObj() {
  return {
    name: getMultilingual('location name ge', 'location name en'),
    lat: 41.7,
    lng: 44.8
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
  var stub = helpers.cloneStub(ServiceStub);
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
