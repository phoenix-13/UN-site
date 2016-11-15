'use strict';

var _ = require('lodash');
var utils = require('../../helpers/parserUtils');


module.exports = {
  parseGetByQuery,

  parseCreate,
  parseUpdate
};


// =============== GET ===============

function parseGetByQuery(req, res, next) {
  var query = req.query;
  req.parsed = utils.parseQuery(query);
  if (query.searchText) {
    req.parsed.orQuery = [
      { 'name.ge': { $regex: query.searchText, $options: 'i' } }
    ];
  }
  next();
}

// =============== POST ===============

function parseCreate(req, res, next) {
  req.parsed = parseEvent(req.body);
  next();
}

function parseUpdate(req, res, next) {
  req.parsed = parseEvent(req.body);
  req.parsed._id = req.body._id;
  next();
}

function parseEvent(body) {
  return _.pick(body,
      [
        'name',
        'description',
        'thumbnailUrl',
        'fromDate',
        'toDate',
        'location',
        'type',
        'content'
      ]
    );
}
