'use strict';

var express = require('express');
var controller = require('./indicator.controller');
// var authService = require('../../utils/auth.service');
var errors = require('../../errors');

var router = express.Router();

router.get('', getAll);
router.get('/:indicatorId', getById);
router.get('/page/:pageIndex', getLimited);
router.post('', create);
router.post('/:indicatorId', update);
router.delete('/:indicatorId', remove);

module.exports = router;

function getById(req, res) {
  var indicatorId = req.params.indicatorId;
  controller.getById(indicatorId)
    .then(indicator => res.json(indicator))
    .catch(errors.logError(`Failed to load indicator ${indicatorId}`))
    .catch(errors.handleError(res));
}

function getAll(req, res) {
  controller.getAll()
    .then(indicators => res.json(indicators))
    .catch(errors.logError('Failed to load all indicators'))
    .catch(errors.handleError(res));
}

function getLimited(req, res) {
  var pageIndex = req.params.pageIndex;
  controller.getLimited(pageIndex)
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
  var indicatorId = req.params.indicatorId;
  var updateData = req.body.data;
  controller.update(indicatorId, updateData)
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to update indicator ${indicatorId}`))
    .catch(errors.handleError(res));
}

function remove(req, res) {
  var indicatorId = req.params.indicatorId;
  controller.remove(indicatorId)
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to remove indicator ${indicatorId}`))
    .catch(errors.handleError(res));
}
