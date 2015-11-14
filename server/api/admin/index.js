'use strict';

var express = require('express');
var adminController = require('./admin.controller');
var adminDao = require('./admin.dao');
var authService = require('../../utils/auth.service');
var schemaValidator = require('./admin.schema.validator');
var errors = require('../../errors');

var router = express.Router();

router.get('/me', authService.verifyToken(), me);
router.post('/authenticate', authenticate);

module.exports = router;

function authenticate(req, res) {
  schemaValidator.validateAdmin(req.body)
    .then(admin => adminController.authenticate(admin.name, admin.password))
    .then(token => res.json({token}))
    .catch(errors.logError(`Failed to authenticate admin ${req.body}`))
    .catch(errors.handleError(res));
}

function me(req, res) {
  adminDao.getById(req.user.id)
    .then(admin => res.json(admin))
    .catch(() => res.json({role: 'guest'}));
}
