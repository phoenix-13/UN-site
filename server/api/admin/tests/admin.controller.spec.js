'use strict';

require('should');
require('../../../config/mongoose');
var adminController = require('../admin.controller');
var adminDao = require('../admin.dao');

describe('admin.controller', () => {
  var admin = {name: 'name', password: 'password'};

  beforeEach((done) => {
    adminDao.removeAll()
      .then(() => done());
  });

  describe('authenticate', () => {
    it('should authenticate admin', (done) => {
      adminDao.create(admin.name, admin.password)
        .then(() => adminController.authenticate(admin.name, admin.password))
        .then(() => done());
    });

    it('should not authenticate not existing admin', (done) => {
      adminController.authenticate(admin.name, admin.password)
        .catch(() => done());
    });

    it('should not authenticate admin with incorrect password', (done) => {
      var invalidPassword = 'invalid password';
      adminDao.create(admin.name, admin.password)
        .then(() => adminController.authenticate(admin.name, invalidPassword))
        .catch(() => done());
    });
  });
});
