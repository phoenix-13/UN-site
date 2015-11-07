'use strict';

var express = require('express');
var controller = require('./demographics.controller');
// var authService = require('../../utils/auth.service');
var errors = require('../../errors');

var router = express.Router();

router.get('/all', getAll);
router.post('/:id/updateYearValues', updateYearValues);

module.exports = router;

function getAll(req, res) {
  controller.getAll()
    .then(demographics => res.json(demographics))
    .catch(errors.logError(`Failed to load demographics`))
    .catch(errors.handleError(res));
}

function updateYearValues(req, res) {
  var demographicsId = req.params.id;
  controller.updateYearValues(demographicsId, req.body.yearValues)
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to update year-values of demographics ${req. params.id}`))
    .catch(errors.handleError(res));
}
