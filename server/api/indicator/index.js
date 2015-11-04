'use strict';

var express = require('express');
var controller = require('./indicator.controller');
var authService = require('../../utils/auth.service');
var errors = require('../../errors');

var router = express.Router();

router.get('/:id', getById);
router.get('/all', getAll);
router.get('/limited', getLimited);
router.post('/create', authService.isAdmin(), create);
router.post('/:id/update', authService.isAdmin(), update);
router.post('/:id/addYearValue', authService.isAdmin(), addYearValue);
router.post('/:id/removeYearValue', authService.isAdmin(), removeYearValue);
router.delete('/:id/remove', authService.isAdmin(), remove);

module.exports = router;

function getById(req, res) {
  controller.getById(req.params.id)
    .then(indicator => res.json(indicator))
    .catch(errors.logError(`Failed to load indicator ${req.params.id}`))
    .catch(errors.handleError(res));
}

function getAll(req, res) {
  controller.getAll()
    .then(indicators => res.json(indicators))
    .catch(errors.logError('Failed to load all indicators'))
    .catch(errors.handleError(res));
}

function getLimited(req, res) {
  controller.getLimited(req.body.offset, req.body.limit)
    .then(indicators => res.json(indicators))
    .catch(errors.logError('Failed to load limited indicators'))
    .catch(errors.handleError(res));
}

function create(req, res) {
  controller.create(req.body.indicator)
    .then(indicator => res.json(indicator))
    .catch(errors.logError(`Failed to create indicator ${req.body.indicator}`))
    .catch(errors.handleError(res));
}

function update(req, res) {
  var indicatorId = req.params.id;
  controller.update(indicatorId, req.body.data)
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to update indicator ${indicatorId}`))
    .catch(errors.handleError(res));
}

function addYearValue(req, res) {
  var indicatorId = req.params.id;
  controller.addYearValue(indicatorId, req.body.yearValue)
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to add year-value to indicator`))
    .catch(errors.handleError(res));
}

function removeYearValue(req, res) {
  var indicatorId = req.params.id;
  controller.removeYearValue(indicatorId, req.body.yearValueId)
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to remove year-value from indicator`))
    .catch(errors.handleError(res));
}

function remove(req, res) {
  controller.remove(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to remove indicator ${req.params.id}`))
    .catch(errors.handleError(res));
}
