'use strict';

var router = require('express').Router();
var co = require('co');
var Event = require('./event.dao');
var parser = require('./event.parser');
// var auth = require('../../auth');


module.exports = router;


router.get('/all', getAll);
router.get('/', parser.parseGetByQuery, getByQuery);

router.post('/', parser.parseCreate, create);
router.post('/update', parser.parseUpdate, update);

router.delete('/:eventId', destroy);


// =============== GET ===============

function getAll(req, res, next) {
  co(function* () {
    var events = yield Event.getAll();
    res.json(events);
  })
  .catch(next);
}

function getByQuery(req, res, next) {
  co(function* () {
    var q = req.parsed;
    var eventsData = yield Event.getByQuery(q.findQuery, q.orQuery, q.sortBy, q.offset, q.limit);
    res.json(eventsData);
  })
  .catch(next);
}

// =============== POST ===============

function create(req, res, next) {
  co(function* () {
    var parsedEvent = req.parsed;
    yield Event.create(parsedEvent);
    res.sendStatus(201);
  })
  .catch(next);
}

function update(req, res, next) {
  co(function* () {
    var parsedEvent = req.parsed;
    yield Event.update(parsedEvent._id, parsedEvent);
    res.sendStatus(200);
  })
  .catch(next);
}

function destroy(req, res, next) {
  co(function* () {
    var eventId = req.params.eventId;
    yield Event.destroy(eventId);
    res.sendStatus(200);
  })
  .catch(next);
}
