'use strict';

var express = require('express');
var controller = require('./publication.controller');
// var authService = require('../../utils/auth.service');
var errors = require('../../errors');

var router = express.Router();

router.get('', getAll);
router.get('/latest', getLatest);
router.get('/:publicationId', getById);
router.get('/page/:pageIndex', getLimited);
router.post('', create);
router.post('/:publicationId', update);
router.delete('/:publicationId', remove);

module.exports = router;

function getById(req, res) {
  var publicationId = req.params.publicationId;
  controller.getById(publicationId)
    .then(publication => res.json(publication))
    .catch(errors.logError(`Failed to load publication ${publicationId}`))
    .catch(errors.handleError(res));
}

function getAll(req, res) {
  controller.getAll()
    .then(publications => res.json(publications))
    .catch(errors.logError('Failed to load all publications'))
    .catch(errors.handleError(res));
}

function getLimited(req, res) {
  var pageIndex = req.params.pageIndex;
  controller.getLimited(pageIndex)
    .then(publications => res.json(publications))
    .catch(errors.logError(`Failed to load limited publications from pageIndex: ${pageIndex}`))
    .catch(errors.handleError(res));
}

function getLatest(req, res) {
  controller.getLatest()
    .then(publications => res.json(publications))
    .catch(errors.logError(`Failed to load latest publications`))
    .catch(errors.handleError(res));
}

function create(req, res) {
  var publication = req.body.publication;
  controller.create(publication)
    .then(publication => res.json(publication))
    .catch(errors.logError(`Failed to create publication ${publication}`))
    .catch(errors.handleError(res));
}

function update(req, res) {
  var publicationId = req.params.publicationId;
  var publicationData = req.body.data;
  controller.update(publicationId, publicationData)
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to update publication: ${publicationId} with data: ${publicationData}`))
    .catch(errors.handleError(res));
}

function remove(req, res) {
  var publicationId = req.params.publicationId;
  controller.remove(publicationId)
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to remove publication ${publicationId}`))
    .catch(errors.handleError(res));
}
