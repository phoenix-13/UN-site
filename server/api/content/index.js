'use strict';

var express = require('express');
var controller = require('./content.controller');
var authService = require('../../utils/auth.service');
var errors = require('../../errors');

var router = express.Router();

router.get('/', getOne);
router.post('/updateFeatured', authService.isAdmin(), updateFeatured);
router.post('/addSlide', authService.isAdmin(), addSlide);
router.post('/addPartner', authService.isAdmin(), addPartner);
router.post('/updateContacts', authService.isAdmin(), updateContacts);
router.post('/updateBanner', authService.isAdmin(), updateBanner);
router.post('/updateAbout', authService.isAdmin(), updateAbout);

module.exports = router;

function getOne(req, res) {
  controller.getOne()
    .then(content => res.json(content))
    .catch(errors.logError(`Failed to load content`))
    .catch(errors.handleError(res));
}

function updateFeatured(req, res) {
  controller.updateFeatured(req.body.featured)
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to update featured`))
    .catch(errors.handleError(res));
}

function addSlide(req, res) {
  controller.addSlide(req.body.slide)
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to add slide to content`))
    .catch(errors.handleError(res));
}

function addPartner(req, res) {
  controller.addPartner(req.body.partner)
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to add partner to content`))
    .catch(errors.handleError(res));
}

function updateContacts(req, res) {
  controller.updateContacts(req.body.contacts)
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to update contacts`))
    .catch(errors.handleError(res));
}

function updateBanner(req, res) {
  controller.updateBanner(req.body.banner)
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to update banner`))
    .catch(errors.handleError(res));
}

function updateAbout(req, res) {
  controller.updateAbout(req.body.about)
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to update about`))
    .catch(errors.handleError(res));
}
