'use strict';

var express = require('express');
var controller = require('./content.controller');
// var authService = require('../../utils/auth.service');
var errors = require('../../errors');

var router = express.Router();
//authService.isAdmin() needed
router.get('/', getOne);
router.post('/updateFeatured', updateFeatured);
router.post('/addSlide', addSlide);
router.post('/updateSlide', updateSlide);
router.post('/removeSlide', removeSlide);
router.post('/updateBanner', updateBanner);
router.post('/addPartner', addPartner);
router.post('/updatePartner', updatePartner);
router.post('/removePartner', removePartner);
router.post('/updateContacts', updateContacts);
router.post('/updateAbout', updateAbout);

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

function updateSlide(req, res) {
  controller.updateSlide(req.body.slideId, req.body.updateData)
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to udpate slide ${req.body.slideId}`))
    .catch(errors.handleError(res));
}

function removeSlide(req, res) {
  controller.removeSlide(req.body.slideId)
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
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to add partner to content`))
    .catch(errors.handleError(res));
}

function updatePartner(req, res) {
  controller.updatePartner(req.body.partnerId, req.body.updateData)
    .then(() => res.sendStatus(200))
    .catch(errors.logError(`Failed to udpate partner ${req.body.partnerId}`))
    .catch(errors.handleError(res));
}

function removePartner(req, res) {
  controller.removePartner(req.body.partnerId)
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
