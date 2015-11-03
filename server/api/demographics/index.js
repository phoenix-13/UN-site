'use strict';

var express = require('express');
var controller = require('./demographics.controller');
var authService = require('../../utils/auth.service');
var errors = require('../../errors');

var router = express.Router();

router.get('/all', getAll);
router.post('/:id/addYearValue', authService.isAdmin(), addYearValue);
router.post('/:id/removeYearValue', authService.isAdmin(), removeYearValue);

module.exports = router;

function getAll(req, res) {
  controller.getAll()
    .then(demographics => res.json(demographics))
    .catch(errors.logError(`Failed to load demographics`))
    .catch(errors.handleError(res));
}

function addYearValue(req, res) {
  var demographicsId = req.params.id;
  controller.addYearValue(demographicsId, req.body.yearValue)
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to add year-value to demographics`))
    .catch(errors.handleError(res));
}

function removeYearValue(req, res) {
  var demographicsId = req.params.id;
  controller.removeYearValue(demographicsId, req.body.yearValueId)
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to remove year-value from demographics`))
    .catch(errors.handleError(res));
}
