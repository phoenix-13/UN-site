'use strict';

var pkg = require('../../../package.json');

module.exports = {
  ip: process.env.IP || undefined,

  port: pkg.config.productionPort,

  mongo: {
    uri: 'mongodb://localhost/UN-site'
  },

  seedDB: true
};
