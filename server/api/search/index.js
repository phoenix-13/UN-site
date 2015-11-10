'use strict';

var express = require('express');
var controller = require('./indicator.controller');
var searchConstants = require('./search.constants');
// var authService = require('../../utils/auth.service');
var errors = require('../../errors');

var router = express.Router();

router.get('/autocompleteAdmin/:searchQuery', autocompleteAdmin);
router.get('/autocompleteMain/:searchQuery', autocompleteMain);

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
