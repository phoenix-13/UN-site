'use strict';

var express = require('express');
var multer = require('multer');
var controller = require('./image.controller');
var multerOptions = require('../../config/multer');
var errors = require('../../errors');

var router = express.Router();

router.post('/upload', multer(multerOptions), create);

module.exports = router;

function create(req, res) {
  var image = { fileName: req.imageName };
  controller.create(image)
    .then(createdImage => res.json(createdImage))
    .catch(errors.logError('Failed to create image: ' + req.imageName))
    .catch(errors.handleError(res));
}
