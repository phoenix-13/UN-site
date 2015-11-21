'use strict';

var express = require('express');
var controller = require('./demographics.controller');
var errors = require('../../errors');
var authService = require('../../utils/auth.service');

var router = express.Router();

router.get('', getAll);
router.post('/:demographyId', authService.verifyToken(), updateYearValues);

module.exports = router;

function getAll(req, res) {
  controller.getAll()
    .then(demographics => res.json(demographics))
    .catch(errors.logError(`Failed to load demographics`))
    .catch(errors.handleError(res));
}

function updateYearValues(req, res) {
  var demographyId = req.params.demographyId;
  controller.updateYearValues(demographyId, req.body.yearValues)
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to update year-values of demographics ${demographyId}`))
    .catch(errors.handleError(res));
}
