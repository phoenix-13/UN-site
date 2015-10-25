'use strict';

var mongoose = require('mongoose');
var errors = mongoose.errors;
var DBEmptyResultError = require('./db-empty-result-error');
var DBUnaffectedUpdateError = require('./db-unaffected-update-error');
var SchemaError = require('./schema-error');
var BusinessLogicValidationError = require('./business-logic-validation-error');
var log4js = require('log4js');
var logger = log4js.getLogger('log');

var errors = {
  assertDBUpdateAffected: function (response) {
    var error = response.result || response;
    if (error.n === 0) {
      throw new DBUnaffectedUpdateError();
    }
  },

  assertDBResultExistence: function (result) {
    if (result) {
      return Promise.resolve(result);
    } else {
      return Promise.reject(new DBEmptyResultError());
    }
  },

  logError: function (additional) {
    return function (error) {
      var errorMessage;
      // console.error(error.stack);
      if (!(error instanceof Error)) {
        errorMessage = 'Name: UnknownError' + '\n';
        errorMessage += 'Error: ' + String(error) + '\n';
      } else {
        errorMessage = 'Name: ' + (error.name || 'UnknownError') + '\n';
        if (error.message) {
          errorMessage += 'Message: ' + error.message + '\n';
        }
      }
      errorMessage += 'Additional: ' + additional + '\n';
      logger.error(errorMessage);
      return Promise.reject(error);
    };
  },

  handleError: function (res) {
    return function (error) {
      if (typeof error.code !== 'number') {
        return res.sendStatus(500);
      }
      var code = error.code || 500;
      res.sendStatus(code);
    };
  }
};



module.exports = errors;
module.exports.DBEmptyResultError = DBEmptyResultError;
module.exports.DBUnaffectedUpdateError = DBUnaffectedUpdateError;
module.exports.SchemaError = SchemaError;
module.exports.BusinessLogicValidationError = BusinessLogicValidationError;
