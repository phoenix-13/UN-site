'use strict';

var _ = require('lodash');
var co = require('co');
var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-as-promised'));
chai.use(require('chai-datetime'));
var testHelpers = require('../../../helpers/testHelpers');
var ResourceNotFoundError = require('../../../errors').ResourceNotFoundError;
var Event = require('../event.dao');
var EventStub = require('../../../stubs/event.stub');

describe('event.dao', () => {
  var eventStub;

  before(co.wrap(function* () {
    testHelpers.connectDB();
    yield testHelpers.clearDB();
  }));

  beforeEach(() => {
    eventStub = EventStub.getSingle();
  });

  after(testHelpers.clearDB);


  // =============== getters ===============

  describe('#getAll()', () => {
    it('should get all events', co.wrap(function* () {
      var eventsData = _.range(10)
        .map(() => EventStub.getSingle());

      yield Event.create(eventsData);

      var events = yield Event.getAll();

      expect(events).to.be.instanceof(Array);
      expect(events).to.have.length(eventsData.length);
    }));
  });

  describe('#getByQuery()', () => {
    const TOTAL_COUNT = 24;

    before(co.wrap(function* () {
      yield Event.destroyAll();

      var events = _.range(TOTAL_COUNT)
        .map(i => {
          var stub = EventStub.getSingle();
          stub.name.ge = (i % 2 === 0) ? 'value-a' : 'value-b';
          return stub;
        });

      yield Event.insertMany(events);
    }));

    it('should get all events by findQuery', co.wrap(function* () {
      var data = yield Event.getByQuery({}, [{}], {}, 0, TOTAL_COUNT);
      expect(data.items).to.have.length(TOTAL_COUNT);
      expect(data.numTotal).to.equal(TOTAL_COUNT);
    }));

    it('should get part of events by findQuery', co.wrap(function* () {
      var data = yield Event.getByQuery({ 'name.ge': 'value-a' }, [{}], {}, 0, TOTAL_COUNT);
      expect(data.items).to.have.length(TOTAL_COUNT / 2);
      expect(data.numTotal).to.equal(TOTAL_COUNT / 2);
    }));

    it('should get all events by orQuery', co.wrap(function* () {
      var orQuery = [{
        'name.ge': { $regex: 'value-a', $options: 'gi' }
      }, {
        'name.ge': { $regex: 'value-b', $options: 'gi' }
      }];

      var data = yield Event.getByQuery({}, orQuery, {}, 0, TOTAL_COUNT);

      expect(data.items).to.have.length(TOTAL_COUNT);
      expect(data.numTotal).to.equal(TOTAL_COUNT);
    }));

    it('should get part of events by orQuery', co.wrap(function* () {
      var orQuery = [{
        'name.ge': { $regex: 'value-a', $options: 'gi' }
      }];

      var data = yield Event.getByQuery({}, orQuery, {}, 0, TOTAL_COUNT);

      expect(data.items).to.have.length(TOTAL_COUNT / 2);
      expect(data.numTotal).to.equal(TOTAL_COUNT / 2);
    }));

    it('should sort by ascending order', co.wrap(function* () {
      var data = yield Event.getByQuery({}, [{}], { 'name.ge': 1 }, 0, TOTAL_COUNT);

      expect(data.items).to.have.length(TOTAL_COUNT);

      for (var i = 1; i < data.items.length; i++) {
        expect(data.items[i].name.ge).to.be.at.least(data.items[i - 1].name.ge);
      }

      expect(data.numTotal).to.equal(TOTAL_COUNT);
    }));

    it('should sort by descending order', co.wrap(function* () {
      var data = yield Event.getByQuery({}, [{}], { 'name.ge': -1 }, 0, TOTAL_COUNT);

      expect(data.items).to.have.length(TOTAL_COUNT);

      for (var i = 1; i < data.items.length; i++) {
        expect(data.items[i - 1].name.ge).to.be.at.least(data.items[i].name.ge);
      }

      expect(data.numTotal).to.equal(TOTAL_COUNT);
    }));

    it('should get all events after offset', co.wrap(function* () {
      var offset = 5;
      var data = yield Event.getByQuery({}, [{}], {}, offset, TOTAL_COUNT);
      expect(data.items).to.have.length(TOTAL_COUNT - offset);
      expect(data.numTotal).to.equal(TOTAL_COUNT);
    }));

    it('should get limited number of events', co.wrap(function* () {
      var limit = 9;
      var data = yield Event.getByQuery({}, [{}], {}, 0, limit);
      expect(data.items).to.have.length(limit);
      expect(data.numTotal).to.equal(TOTAL_COUNT);
    }));
  });

  describe('#getById()', () => {
    var event;

    beforeEach(co.wrap(function* () {
      var createdEvent = yield Event.create(eventStub);
      event = yield Event.getById(createdEvent._id);
    }));

    it('should get event by id', () => {
      expect(event).to.be.an('object');
    });

    it('should throw error if event was not found', () => {
      var dummyId = testHelpers.DUMMY_ID;

      return expect(Event.getById(dummyId))
        .to.be.rejectedWith(ResourceNotFoundError, `event (id "${dummyId}") was not found`);
    });
  });


  // =============== setters ===============

  describe('#create()', () => {
    var eventData;
    var event;

    beforeEach(co.wrap(function* () {
      eventData = eventStub;
      event = yield Event.create(eventData);
    }));

    it('should create event', () => {
      expect(event).to.be.an('object');
    });

    it('should contain proper fields', () => {
      expectBaseFieldsToMatch(event, eventData);
    });
  });

  describe('#update()', () => {
    it('should update event', co.wrap(function* () {
      var event = yield Event.create(eventStub);

      var newData = {
        'name.ge': 'new name ge',
      };

      yield Event.update(Event._id, newData);

      var updatedEvent = yield Event.getById(event._id);

      expect(updatedEvent).to.have.deep.property('name.ge', newData['name.ge']);
    }));

    it('should throw error if passed event does not exist', () => {
      var dummyId = testHelpers.DUMMY_ID;
      var newData = eventStub;

      return expect(Event.update(dummyId, newData))
        .to.be.rejectedWith(ResourceNotFoundError, `could not update event (id "${dummyId}")`);
    });
  });

  describe('#destroy()', () => {
    it('should destroy event', co.wrap(function* () {
      var event = yield event.create(eventStub);

      yield Event.destroy(event._id);

      return expect(Event.getById(event._id))
        .to.be.rejectedWith(ResourceNotFoundError, `event (id "${event._id}") was not found`);
    }));

    it('should throw error if passed event does not exist', () => {
      var dummyId = testHelpers.DUMMY_ID;

      return expect(Event.destroy(dummyId))
        .to.be.rejectedWith(ResourceNotFoundError, `could not destroy event (id "${dummyId}")`);
    });
  });
});

function expectBaseFieldsToMatch(actual, expected) {
  expect(actual).to.have.deep.property('name.ge', expected.name.ge);
  expect(actual).to.have.deep.property('description.ge', expected.description.ge);
  expect(actual).to.have.property('thumbnailUrl', expected.thumbnailUrl);
  expect(actual).to.have.property('fromDate', expected.fromDate);
  expect(actual).to.have.property('toDate', expected.toDate);
  expect(actual).to.have.deep.property('location.name.ge', expected.location.name.ge);
  expect(actual).to.have.deep.property('type.ge', expected.type.ge);
  expect(actual).to.have.deep.property('content.ge', expected.content.ge);
}
