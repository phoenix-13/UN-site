'use strict';

var _ = require('lodash');

const MAX_LIMIT = 1e3;


module.exports = {
  parseQuery,
  parseSortBy,
  parseMultilingualName
};


function parseQuery(query) {
  var page = parsePage(query.page);
  var limit = parseLimit(query.limit);
  var offset = computeOffset(page, limit);

  if (query.all === 'true') {
    offset = 0;
    limit = MAX_LIMIT;
  }

  return {
    findQuery: {},
    orQuery: [{}],
    sortBy: { _id: -1 },
    page,
    limit,
    offset
  };
}

function parsePage(page) {
  page = Number(page);
  return (isFinite(page) && page > 0) ? page : 1;
}

function parseLimit(limit) {
  limit = Number(limit);
  return (isFinite(limit) && limit > 0 && limit <= MAX_LIMIT) ? limit : 1;
}

function computeOffset(page, limit) {
  return (page - 1) * limit;
}

function parseSortBy(sortBy) {
  sortBy = String(sortBy);
  var value;
  var key = sortBy.substr(0, sortBy.length - 1);
  var sign = sortBy[sortBy.length - 1];

  switch (sign) {
    case '+':
      value = 1;
      break;
    case '-':
      value = -1;
      break;
    default:
      return null;
  }

  return {
    key,
    value
  };
}

function parseMultilingualName(name) {
  return _.pick(name, ['ge', 'en', 'ru']);
}
