'use strict';

var _ = require('lodash');
var co = require('co');
var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-as-promised'));
chai.use(require('chai-datetime'));
var testHelpers = require('../../../helpers/testHelpers');
var ResourceNotFoundError = require('../../../errors').ResourceNotFoundError;
var Volunteer = require('../volunteer.dao');
var VolunteerStub = require('../../../stubs/volunteer.stub');

describe('volunteer.dao', () => {
  var volunteerStub;

  before(co.wrap(function* () {
    testHelpers.connectDB();
    yield testHelpers.clearDB();
  }));

  beforeEach(() => {
    volunteerStub = VolunteerStub.getSingle();
  });

  after(testHelpers.clearDB);


  // =============== getters ===============

  describe('#getAll()', () => {
    it('should get all volunteers', co.wrap(function* () {
      var volunteersData = _.range(10)
        .map(() => VolunteerStub.getSingle());

      yield Volunteer.create(volunteersData);

      var volunteers = yield Volunteer.getAll();

      expect(volunteers).to.be.instanceof(Array);
      expect(volunteers).to.have.length(volunteersData.length);
    }));
  });

  describe('#getByQuery()', () => {
    const TOTAL_COUNT = 24;

    before(co.wrap(function* () {
      yield Volunteer.destroyAll();

      var volunteers = _.range(TOTAL_COUNT)
        .map(i => {
          var stub = VolunteerStub.getSingle();
          stub.lastName.ge = (i % 2 === 0) ? 'value-a' : 'value-b';
          return stub;
        });

      yield Volunteer.insertMany(volunteers);
    }));

    it('should get all volunteers by findQuery', co.wrap(function* () {
      var data = yield Volunteer.getByQuery({}, [{}], {}, 0, TOTAL_COUNT);
      expect(data.items).to.have.length(TOTAL_COUNT);
      expect(data.numTotal).to.equal(TOTAL_COUNT);
    }));

    it('should get part of volunteers by findQuery', co.wrap(function* () {
      var data = yield Volunteer.getByQuery({ 'lastName.ge': 'value-a' }, [{}], {}, 0, TOTAL_COUNT);
      expect(data.items).to.have.length(TOTAL_COUNT / 2);
      expect(data.numTotal).to.equal(TOTAL_COUNT / 2);
    }));

    it('should get all volunteers by orQuery', co.wrap(function* () {
      var orQuery = [{
        'lastName.ge': { $regex: 'value-a', $options: 'gi' }
      }, {
        'lastName.ge': { $regex: 'value-b', $options: 'gi' }
      }];

      var data = yield Volunteer.getByQuery({}, orQuery, {}, 0, TOTAL_COUNT);

      expect(data.items).to.have.length(TOTAL_COUNT);
      expect(data.numTotal).to.equal(TOTAL_COUNT);
    }));

    it('should get part of volunteers by orQuery', co.wrap(function* () {
      var orQuery = [{
        'lastName.ge': { $regex: 'value-a', $options: 'gi' }
      }];

      var data = yield Volunteer.getByQuery({}, orQuery, {}, 0, TOTAL_COUNT);

      expect(data.items).to.have.length(TOTAL_COUNT / 2);
      expect(data.numTotal).to.equal(TOTAL_COUNT / 2);
    }));

    it('should sort by ascending order', co.wrap(function* () {
      var data = yield Volunteer.getByQuery({}, [{}], { 'lastName.ge': 1 }, 0, TOTAL_COUNT);

      expect(data.items).to.have.length(TOTAL_COUNT);

      for (var i = 1; i < data.items.length; i++) {
        expect(data.items[i].lastName.ge).to.be.at.least(data.items[i - 1].lastName.ge);
      }

      expect(data.numTotal).to.equal(TOTAL_COUNT);
    }));

    it('should sort by descending order', co.wrap(function* () {
      var data = yield Volunteer.getByQuery({}, [{}], { 'lastName.ge': -1 }, 0, TOTAL_COUNT);

      expect(data.items).to.have.length(TOTAL_COUNT);

      for (var i = 1; i < data.items.length; i++) {
        expect(data.items[i - 1].lastName.ge).to.be.at.least(data.items[i].lastName.ge);
      }

      expect(data.numTotal).to.equal(TOTAL_COUNT);
    }));

    it('should get all volunteers after offset', co.wrap(function* () {
      var offset = 5;
      var data = yield Volunteer.getByQuery({}, [{}], {}, offset, TOTAL_COUNT);
      expect(data.items).to.have.length(TOTAL_COUNT - offset);
      expect(data.numTotal).to.equal(TOTAL_COUNT);
    }));

    it('should get limited number of volunteers', co.wrap(function* () {
      var limit = 9;
      var data = yield Volunteer.getByQuery({}, [{}], {}, 0, limit);
      expect(data.items).to.have.length(limit);
      expect(data.numTotal).to.equal(TOTAL_COUNT);
    }));
  });

  describe('#getById()', () => {
    var volunteer;

    beforeEach(co.wrap(function* () {
      var createdVolunteer = yield Volunteer.create(volunteerStub);
      volunteer = yield Volunteer.getById(createdVolunteer._id);
    }));

    it('should get volunteer by id', () => {
      expect(volunteer).to.be.an('object');
    });

    it('should throw error if volunteer was not found', () => {
      var dummyId = testHelpers.DUMMY_ID;

      return expect(Volunteer.getById(dummyId))
        .to.be.rejectedWith(ResourceNotFoundError, `volunteer (id "${dummyId}") was not found`);
    });
  });


  // =============== setters ===============

  describe('#create()', () => {
    var volunteerData;
    var volunteer;

    beforeEach(co.wrap(function* () {
      volunteerData = volunteerStub;
      volunteer = yield Volunteer.create(volunteerData);
    }));

    it('should create volunteer', () => {
      expect(volunteer).to.be.an('object');
    });

    it('should contain proper fields', () => {
      expectBaseFieldsToMatch(volunteer, volunteerData);
    });
  });

  describe('#update()', () => {
    it('should update volunteer', co.wrap(function* () {
      var volunteer = yield Volunteer.create(volunteerStub);

      var newData = {
        'lastName.ge': 'new lastName ge',
      };

      yield Volunteer.update(volunteer._id, newData);

      var updatedVolunteer = yield Volunteer.getById(volunteer._id);

      expect(updatedVolunteer).to.have.deep.property('lastName.ge', newData['lastName.ge']);
    }));

    it('should throw error if passed volunteer does not exist', () => {
      var dummyId = testHelpers.DUMMY_ID;
      var newData = volunteerStub;

      return expect(Volunteer.update(dummyId, newData))
        .to.be.rejectedWith(ResourceNotFoundError, `could not update volunteer (id "${dummyId}")`);
    });
  });

  describe('#destroy()', () => {
    it('should destroy volunteer', co.wrap(function* () {
      var volunteer = yield Volunteer.create(volunteerStub);

      yield Volunteer.destroy(volunteer._id);

      return expect(Volunteer.getById(volunteer._id))
        .to.be.rejectedWith(ResourceNotFoundError, `volunteer (id "${volunteer._id}") was not found`);
    }));

    it('should throw error if passed volunteer does not exist', () => {
      var dummyId = testHelpers.DUMMY_ID;

      return expect(Volunteer.destroy(dummyId))
        .to.be.rejectedWith(ResourceNotFoundError, `could not destroy volunteer (id "${dummyId}")`);
    });
  });
});

function expectBaseFieldsToMatch(actual, expected) {
  expect(actual).to.have.deep.property('firstName.ge', expected.firstName.ge);
  expect(actual).to.have.deep.property('lastName.ge', expected.lastName.ge);
  expect(actual).to.have.deep.property('gender.ge', expected.gender.ge);
  expect(actual).to.have.property('dateOfBirth', expected.dateOfBirth);
  expect(actual).to.have.deep.property('address.ge', expected.address.ge);
  expect(actual).to.have.deep.property('region.ge', expected.region.ge);
  expect(actual).to.have.deep.property('education.ge', expected.education.ge);
  expect(actual).to.have.property('email.ge', expected.email.ge);
  expect(actual).to.have.property('phoneNumber.ge', expected.phoneNumber.ge);

  // expect(actual).to.have.property('interestAreas', expected.interestAreas);

  expect(actual).to.have.deep.property('experience.description.ge', expected.experience.description.ge);

  // expect(actual).to.have.property('languages', expected.languages);
  // expect(actual).to.have.property('computerPrograms', expected.computerPrograms);
  expect(actual).to.have.deep.property('about.ge', expected.about.ge);
}
