'use strict';

var express = require('express');
var controller = require('./search.controller');
var searchConstants = require('./search.constants');
var errors = require('../../errors');

var router = express.Router();

router.get('/admin/:searchQuery', autocompleteAdmin);
router.get('/main/:searchQuery', autocompleteMain);
router.get('', search);

module.exports = router;

function autocompleteAdmin(req, res) {
  var searchQuery = req.params.searchQuery;
  var limit = searchConstants.adminAutocompleteLimit;
  controller.autocomplete(searchQuery, limit)
    .then(result => res.json(result))
    .catch(errors.logError(`Failed to load admin autocomplete results of '${searchQuery}'`))
    .catch(errors.handleError(res));
}

function autocompleteMain(req, res) {
  var searchQuery = req.params.searchQuery;
  var limit = searchConstants.mainAutocompleteLimit;
  controller.autocomplete(searchQuery, limit)
    .then(result => res.json(result))
    .catch(errors.logError(`Failed to load main autocomplete results of '${searchQuery}'`))
    .catch(errors.handleError(res));
}

function search(req, res) {
  var searchQuery = req.query.searchQuery;
  var categoryId = req.query.categoryId;
  var year = req.query.year;
  var indicatorsOffset = Number(req.query.indicatorsOffset);
  var publicationsOffset = Number(req.query.publicationsOffset);
  var limit = searchConstants.searchLimit;
  controller.search(searchQuery, categoryId, year, indicatorsOffset, publicationsOffset, limit)
    .then(result => res.json(result))
    .catch(errors.logError(`Failed to load search results of params: ${searchQuery}, ${categoryId}, ${year} and offsets`))
    .catch(errors.handleError(res));
}
