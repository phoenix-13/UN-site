'use strict';

var Search = require('./search.dao');
var searchConstants = require('./search.constants');

module.exports = {
  autocomplete
};

function autocomplete(searchQuery, limit) {
  searchQuery = manageSearchQueryLength(searchQuery);
  return Search.autocomplete(searchQuery, limit);
}

function manageSearchQueryLength(searchQuery) {
  if (searchQuery.length > searchConstants.searchQueryMaxLength)
    return searchQuery.substring(0, searchConstants.searchQueryMaxLength - 1);

  return searchQuery;
}
