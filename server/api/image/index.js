'use strict';

var express = require('express');
var multer = require('multer');
var multerOptions = require('../../config/multer');
var controller = require('./image.controller');
var errors = require('../../errors');
var authService = require('../../utils/auth.service');

var router = express.Router();

router.get('', authService.verifyToken(), getAll);
router.post('', authService.verifyToken(), multer(multerOptions), create);
router.delete('/:imageId', authService.verifyToken(), remove);

module.exports = router;

function getAll(req, res) {
  controller.getAll()
    .then(images => res.json(images))
    .catch(errors.logError('Failed to load images'))
    .catch(errors.handleError(res));
}

function create(req, res) {
  controller.create(req.imageName)
    .then(createdImage => res.json(createdImage))
    .catch(errors.logError('Failed to create image: ' + req.imageName))
    .catch(errors.handleError(res));
}

function remove(req, res) {
  controller.remove(req.params.imageId)
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to remove image with id: ${req.params.imageId}`))
    .catch(errors.handleError(res));
}
