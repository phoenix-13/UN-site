'use strict';

var searchConstants = require('./search.constants');

module.exports = {
  parseQueryParam,
  parseCategoryId
};

function parseQueryParam(queryParam) {
  return (queryParam) ? manageQueryParamLength(queryParam) : queryParam;
}

function parseCategoryId(categoryId) {
  if (!categoryId) return categoryId;
  if (categoryId.length !== 24) return undefined;
}

function manageQueryParamLength(queryParam) {
  if (queryParam.length > searchConstants.queryParamMaxLength)
    return queryParam.substring(0, searchConstants.queryParamMaxLength - 1);

  return queryParam;
}
