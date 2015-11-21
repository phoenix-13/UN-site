'use strict';

var express = require('express');
var controller = require('./content.controller');
var authService = require('../../utils/auth.service');
var errors = require('../../errors');

var router = express.Router();
router.get('/', getOne);
router.post('/updateFeatured', authService.verifyToken(), updateFeatured);
router.post('/addSlide', authService.verifyToken(), addSlide);
router.post('/updateSlide/:slideId', authService.verifyToken(), updateSlide);
router.post('/removeSlide/:slideId', authService.verifyToken(), removeSlide);
router.post('/updateBanner', authService.verifyToken(), updateBanner);
router.post('/addPartner', authService.verifyToken(), addPartner);
router.post('/updatePartner/:partnerId', authService.verifyToken(), updatePartner);
router.post('/removePartner/:partnerId', authService.verifyToken(), removePartner);
router.post('/updateContacts', authService.verifyToken(), updateContacts);
router.post('/updateAbout', authService.verifyToken(), updateAbout);

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
    .then(addedSlide => res.json(addedSlide))
    .catch(errors.logError(`Failed to add slide to content`))
    .catch(errors.handleError(res));
}

function updateSlide(req, res) {
  controller.updateSlide(req.params.slideId, req.body.updateData)
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to udpate slide ${req.body.slideId}`))
    .catch(errors.handleError(res));
}

function removeSlide(req, res) {
  controller.removeSlide(req.params.slideId)
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to remove slide from content`))
    .catch(errors.handleError(res));
}

function updateBanner(req, res) {
  controller.updateBanner(req.body.banner)
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to update banner`))
    .catch(errors.handleError(res));
}

function addPartner(req, res) {
  controller.addPartner(req.body.partner)
    .then(addedPartner => res.json(addedPartner))
    .catch(errors.logError(`Failed to add partner to content`))
    .catch(errors.handleError(res));
}

function updatePartner(req, res) {
  controller.updatePartner(req.params.partnerId, req.body.updateData)
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to udpate partner ${req.body.partnerId}`))
    .catch(errors.handleError(res));
}

function removePartner(req, res) {
  controller.removePartner(req.params.partnerId)
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to remove partner from content`))
    .catch(errors.handleError(res));
}

function updateContacts(req, res) {
  controller.updateContacts(req.body.contacts)
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to update contacts`))
    .catch(errors.handleError(res));
}

function updateAbout(req, res) {
  controller.updateAbout(req.body.about)
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to update about`))
    .catch(errors.handleError(res));
}
