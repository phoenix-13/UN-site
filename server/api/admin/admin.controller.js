'use strict';

var AdminDao = require('./admin.dao');
var authService = require('../../utils/auth.service');

module.exports = {
  authenticate
};

function authenticate(name, password) {
  return AdminDao.authenticate(name, password)
    .then(admin => authService.signToken({id: admin.id, role: admin.role}));
}
