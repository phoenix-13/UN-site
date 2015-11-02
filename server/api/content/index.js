'use strict';

var express = require('express');
var controller = require('./content.controller');
var authService = require('../../utils/auth.service');
var errors = require('../../errors');

var router = express.Router();

router.get('/', authService.isAdmin(), getOne);
router.post('/updateContacts', authService.isClient(), updateContacts);

module.exports = router;

function getOne(req, res) {
  controller.getOne()
    .then(content => res.json(content))
    .catch(errors.logError(`Failed to load content`))
    .catch(errors.handleError(res));
}

function updateContacts(req, res) {
  controller.updateContacts(req.body.contacts)
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to update contacts`))
    .catch(errors.handleError(res));
}
