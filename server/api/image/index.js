'use strict';

var express = require('express');
var multer = require('multer');
var multerOptions = require('../../config/multer');
var controller = require('./image.controller');
var errors = require('../../errors');

var router = express.Router();

router.get('', getAll);
router.post('', multer(multerOptions), createImage);
router.delete('/:imageId', removeImage);

module.exports = router;

function createImage(req, res) {
  controller.create(req.imageName)
    .then(createdImage => res.json(createdImage))
    .catch(errors.logError('Failed to create image: ' + req.imageName))
    .catch(errors.handleError(res));
}

function getAll(req, res) {
  controller.getAll()
    .then(images => res.json(images))
    .catch(errors.logError('Failed to load images'))
    .catch(errors.handleError(res));
}

function removeImage(req, res) {
  controller.remove(req.params.imageId)
    .then(images => res.json(images))
    .catch(errors.logError(`Failed to remove images with id: ${req.params.imageId}`))
    .catch(errors.handleError(res));
}
