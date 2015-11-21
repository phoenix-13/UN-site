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
  var orQuery = getOrQueryArr(queryString);
  var selectFields = '_id title';

  return Q.all([
      Indicator.find().or(orQuery).select(selectFields).limit(limit).execAsync(),
      Indicator.find().or(orQuery).countAsync(),
      Publication.find().or(orQuery).select(selectFields).limit(limit).execAsync(),
      Publication.find().or(orQuery).countAsync()
    ])
    .spread(getResultObject);
}

function search(queryString, categoryId, year, indicatorsOffset, publicationsOffset, limit) {
  var orQuery = getOrQueryArr(queryString);
  var indFindQuery = getIndFindQueryObject(categoryId);
  var pubFindQuery = getPubFindQueryObject(categoryId, year);

  return Q.all([
      Indicator.find(indFindQuery).or(orQuery).sort({ '_id': -1 }).skip(indicatorsOffset).limit(limit).execAsync(),
      Indicator.find(indFindQuery).or(orQuery).countAsync(),
      Publication.find(pubFindQuery).or(orQuery).sort({ '_id': -1 }).skip(publicationsOffset).limit(limit).execAsync(),
      Publication.find(pubFindQuery).or(orQuery).countAsync()
    ])
    .spread(getResultObject);
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

function getOrQueryArr(queryString) {
  return [
    { 'title.geo': { $regex: queryString, $options: 'gi' } },
    { 'title.eng': { $regex: queryString, $options: 'gi' } }
  ];
}

function getIndFindQueryObject(categoryId) {
  if (categoryId)
    return { category: categoryId };
  else
    return {};
}

function getPubFindQueryObject(categoryId, year) {
  var res = {};
  if (categoryId) res.categories = categoryId;
  if (year) res.year = year;
  return res;
}
