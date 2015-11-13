'use strict';

var Q = require('bluebird');
var Joi = require('joibird');
var adminConstants = require('./admin.constants');
var SchemaError = require('../../errors').SchemaError;

module.exports = {
  validateAdmin: validateAdmin
};

var adminSchema = Joi.object().keys({
  name: Joi.string().min(adminConstants.nameMinLength).max(adminConstants.nameMaxLength).required(),
  password: Joi.string().min(adminConstants.passwordMinLength).max(adminConstants.passwordMaxLength).required()
}).required();

function validateAdmin(admin) {
  return Joi.validate(admin, adminSchema)
    .catch((err) => Q.reject(new SchemaError(err.message)));
}
