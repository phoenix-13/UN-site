'use strict';

require('../../../config/mongoose');
var errors = require('../../../errors');
var DBEmptyResultError = errors.DBEmptyResultError;
var Admin = require('../admin.dao');

describe('admin.dao', function () {
  var admin = {name: 'name', password: 'password'};

  beforeEach((done) => {
    Admin.removeAll()
      .then(() => Admin.create(admin.name, admin.password))
      .then(() => done());
  });

  describe('getByName', function () {
    it('should find admin by name', (done) => {
      Admin.getByName(admin.name)
        .then(() => done());
    });

    it('should not find admin with not existing name', (done) => {
      Admin.getByName('notExistingName')
        .catch(DBEmptyResultError, () => done());
    });
  });

  describe('authenticate', function () {
    it('should authenticate created admin', (done) => {
      Admin.authenticate(admin.name, admin.password)
        .then(() => done());
    });

    it('should not authenticate not existing admin', (done) => {
      Admin.authenticate('notExistingName', 'notExistingPassword')
        .catch(DBEmptyResultError, () => done());
    });

    it('should not authenticate admin wiht incorrect password', (done) => {
      Admin.authenticate(admin.name, 'incorrect password')
        .catch(() => done());
    });
  });
});
