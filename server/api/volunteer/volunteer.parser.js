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
      { 'lastName.ge': { $regex: query.searchText, $options: 'i' } }
    ];
  }
  next();
}

// =============== POST ===============

function parseCreate(req, res, next) {
  req.parsed = parseVolunteer(req.body);
  next();
}

function parseUpdate(req, res, next) {
  req.parsed = parseVolunteer(req.body);
  req.parsed._id = req.body._id;
  next();
}

function parseVolunteer(body) {
  return _.pick(body,
      [
        'firstName',
        'lastName',
        'gender',
        'dateOfBirth',
        'address',
        'region',
        'education',
        'email',
        'phoneNumber',
        'interestAreas',
        'experience',
        'languages',
        'computerPrograms',
        'about'
      ]
    );
}
