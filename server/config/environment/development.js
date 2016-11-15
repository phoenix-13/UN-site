'use strict';

var pkg = require('../../../package.json');

module.exports = {
  port: pkg.config.developmentPort,

  mongo: {
    uri: 'mongodb://localhost/UN-site-dev'
  },
  seedDB: true
};
