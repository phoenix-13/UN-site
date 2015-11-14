'use strict';

var Q = require('bluebird');
var Indicator = require('../indicator/indicator.model');
var Publication = require('../publication/publication.model');

Q.promisifyAll(Indicator);
Q.promisifyAll(Indicator.prototype);
Q.promisifyAll(Publication);
Q.promisifyAll(Publication.prototype);

module.exports = {
  autocomplete,
  search
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
    .then(result => Q.resolve(getResultObject.apply(null, result)));
}

function search(queryString, categoryId, year, offset, limit) {
  var orQuery = [
    { 'title.geo': { $regex: queryString, $options: 'gi' } },
    { 'title.eng': { $regex: queryString, $options: 'gi' } }
  ];
  var indFindQuery = getIndFindQueryObject(categoryId);
  var pubFindQuery = getPubFindQueryObject(categoryId, year);

  return Q.all([
      Indicator.find(indFindQuery).or(orQuery).skip(offset).limit(limit).execAsync(),
      Indicator.find(indFindQuery).or(orQuery).countAsync(),
      Publication.find(pubFindQuery).or(orQuery).skip(offset).limit(limit).execAsync(),
      Publication.find(pubFindQuery).or(orQuery).countAsync()
    ])
    .then(result => Q.resolve(getResultObject.apply(null, result)));
}

function getResultObject(indicators, indicatorsNum, publications, publicationsNum) {
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

function getIndFindQueryObject(categoryId) {
  if (categoryId)
    return { category: categoryId };
  else
    return {};
}

function getPubFindQueryObject(categoryId, year) {
  var res = {};
  if (categoryId) res.category = categoryId;
  if (year) res.year = year;
  return res;
}
