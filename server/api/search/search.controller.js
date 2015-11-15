'use strict';

var Search = require('./search.dao');
var searchParser = require('./search.parser');

module.exports = {
  autocomplete,
  search
};

function autocomplete(searchQuery, limit) {
  searchQuery = searchParser.parseQueryParam(searchQuery);
  return Search.autocomplete(searchQuery, limit);
}

function search(searchQuery, categoryId, year, indicatorsOffset, publicationsOffset, limit) {
  searchQuery = searchParser.parseQueryParam(searchQuery);
  categoryId = searchParser.parseCategoryId(categoryId);
  year = searchParser.parseQueryParam(year);
  indicatorsOffset = searchParser.parseQueryParam(indicatorsOffset);
  publicationsOffset = searchParser.parseQueryParam(publicationsOffset);
  return Search.search(searchQuery, categoryId, year, indicatorsOffset, publicationsOffset, limit);
}
