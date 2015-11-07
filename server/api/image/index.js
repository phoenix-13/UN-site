'use strict';

var express = require('express');
var multer = require('multer');
var multerOptions = require('../../config/multer');
var controller = require('./image.controller');
var errors = require('../../errors');

var router = express.Router();

router.get('', getAll);
router.post('', multer(multerOptions), createImage);

module.exports = router;

function createImage(req, res) {
  controller.create(req.imageName)
    .then(createdImage => res.json(createdImage))
    .catch(errors.logError('Failed to create image: ' + image))
    .catch(errors.handleError(res));
}

function getAll(req, res) {
  controller.getAll()
    .then(images => res.json(images))
    .catch(errors.logError('Failed to load images'))
    .catch(errors.handleError(res));
}