'use strict';

var Q = require('bluebird');
var Indicator = require('../indicator/indicator.model');
var Publication = require('../publication/publication.model');

Q.promisifyAll(Indicator);
Q.promisifyAll(Indicator.prototype);
Q.promisifyAll(Publication);
Q.promisifyAll(Publication.prototype);

module.exports = {
  autocomplete
};

function autocomplete(queryString, limit) {
  var orQuery = [
    { 'title.geo': { $regex: queryString, $options: 'gi' } },
    { 'title.eng': { $regex: queryString, $options: 'gi' } }
  ];
  var selectFields = '_id title';

  return Q.all([
      Indicator.find().or(orQuery).select(selectFields).limit(limit).execAsync(),
      Indicator.find().or(orQuery).countAsync(),
      Publication.find().or(orQuery).select(selectFields).limit(limit).execAsync(),
      Publication.find().or(orQuery).countAsync()
    ])
    .then(result => Q.resolve(getAutocompleteResultObject.apply(null, result)));
}

function getAutocompleteResultObject(indicators, indicatorsNum, publications, publicationsNum) {
  return {
    indicators: {
      items: indicators,
      numTotal: indicatorsNum
    },
    publications: {
      items: publications,
      numTotal: publicationsNum
    }
  };
}
