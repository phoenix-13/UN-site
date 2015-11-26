'use strict';

var express = require('express');
var multer = require('multer');
var multerOptions = require('../../config/multer');
var controller = require('./file.controller');
var errors = require('../../errors');
var authService = require('../../utils/auth.service');

var router = express.Router();

router.get('', authService.verifyToken(), getAll);
router.post('', authService.verifyToken(), multer(multerOptions), create);
router.delete('/:fileId', authService.verifyToken(), remove);

module.exports = router;

function getAll(req, res) {
  controller.getAll()
    .then(files => res.json(files))
    .catch(errors.logError('Failed to load files'))
    .catch(errors.handleError(res));
}

function create(req, res) {
  controller.create(req.fileName)
    .then(createdFile => res.json(createdFile))
    .catch(errors.logError(`Failed to create file: ${req.fileName}`))
    .catch(errors.handleError(res));
}

function remove(req, res) {
  controller.remove(req.params.fileId)
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to remove file with id: ${req.params.fileId}`))
    .catch(errors.handleError(res));
}
