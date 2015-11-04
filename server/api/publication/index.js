'use strict';

var express = require('express');
var controller = require('./publication.controller');
var authService = require('../../utils/auth.service');
var errors = require('../../errors');

var router = express.Router();

router.get('/:id', getById);
router.get('/all', getAll);
router.get('/limited', getLimited);
router.post('/create', authService.isAdmin(), create);
router.post('/:id/update', authService.isAdmin(), update);
router.delete('/:id/remove', authService.isAdmin(), remove);

module.exports = router;

function getById(req, res) {
  controller.getById(req.params.id)
    .then(publication => res.json(publication))
    .catch(errors.logError(`Failed to load publication ${req.params.id}`))
    .catch(errors.handleError(res));
}

function getAll(req, res) {
  controller.getAll()
    .then(publications => res.json(publications))
    .catch(errors.logError('Failed to load all publications'))
    .catch(errors.handleError(res));
}

function getLimited(req, res) {
  controller.getLimited(req.body.offset, req.body.limit)
    .then(publications => res.json(publications))
    .catch(errors.logError('Failed to load limited publications'))
    .catch(errors.handleError(res));
}

function create(req, res) {
  controller.create(req.body.publication)
    .then(publication => res.json(publication))
    .catch(errors.logError(`Failed to create publication ${req.body.publication}`))
    .catch(errors.handleError(res));
}

function update(req, res) {
  var publicationId = req.params.id;
  controller.update(publicationId, req.body.data)
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to update publication ${publicationId}`))
    .catch(errors.handleError(res));
}

function remove(req, res) {
  controller.remove(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to remove publication ${req.params.id}`))
    .catch(errors.handleError(res));
}
