'use strict';

var express = require('express');
var controller = require('./category.controller');
// var authService = require('../../utils/auth.service');
var errors = require('../../errors');

var router = express.Router();

router.get('', getAll);

module.exports = router;

function getAll(req, res) {
  controller.getAll()
    .then(categories => res.json(categories))
    .catch(errors.logError('Failed to load all categories'))
    .catch(errors.handleError(res));
}
