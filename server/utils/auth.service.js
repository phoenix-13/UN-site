'use strict';

var compose = require('composable-middleware');
var config = require('../config/environment');
var expressJwt = require('express-jwt');
var validateJwt = expressJwt({secret: config.secrets.session});
var jwt = require('jsonwebtoken');

module.exports = {
  signToken,
  isAuthenticated,
  hasRole,
};

function isAuthenticated() {
  return compose().use(validateJwt)
    .use(function (err, req, res, next) {
      if (err.name === 'UnauthorizedError') {
        res.json({role: 'guest'});
      } else {
        next(err);
      }
    });
}

function signToken(tokenData) {
  return jwt.sign(tokenData, config.secrets.session, {expiresIn: config.tokenExpireTimeInSeconds});
}