'use strict';

var compose = require('composable-middleware');
var session = require('../config/environment').session;
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var validateJwt = expressJwt({secret: session.secret});

module.exports = {
  verifyToken,
  signToken
};

function verifyToken() {
  return compose().use(validateJwt)
    .use(function (err, req, res, next) {
      if (err.name === 'UnauthorizedError') {
        return res.json({role: 'guest'});
      } else {
        return next(err);
      }
    });
}

function signToken(tokenData) {
  return jwt.sign(tokenData, session.secret , {expiresIn: session.expireTimeInSeconds});
}

