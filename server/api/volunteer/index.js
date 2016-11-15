'use strict';

var router = require('express').Router();
var co = require('co');
var Volunteer = require('./volunteer.dao');
var parser = require('./volunteer.parser');
// var auth = require('../../auth');


module.exports = router;


router.get('/all', getAll);
router.get('/', parser.parseGetByQuery, getByQuery);

router.post('/', parser.parseCreate, create);
router.post('/update', parser.parseUpdate, update);

router.delete('/:volunteerId', destroy);


// =============== GET ===============

function getAll(req, res, next) {
  co(function* () {
    var volunteers = yield Volunteer.getAll();
    res.json(volunteers);
  })
  .catch(next);
}

function getByQuery(req, res, next) {
  co(function* () {
    var q = req.parsed;
    var volunteersData = yield Volunteer.getByQuery(q.findQuery, q.orQuery, q.sortBy, q.offset, q.limit);
    res.json(volunteersData);
  })
  .catch(next);
}

// =============== POST ===============

function create(req, res, next) {
  co(function* () {
    var parsedVolunteer = req.parsed;
    yield Volunteer.create(parsedVolunteer);
    res.sendStatus(201);
  })
  .catch(next);
}

function update(req, res, next) {
  co(function* () {
    var parsedVolunteer = req.parsed;
    yield Volunteer.update(parsedVolunteer._id, parsedVolunteer);
    res.sendStatus(200);
  })
  .catch(next);
}

function destroy(req, res, next) {
  co(function* () {
    var volunteerId = req.params.volunteerId;
    yield Volunteer.destroy(volunteerId);
    res.sendStatus(200);
  })
  .catch(next);
}
