'use strict';

module.exports = {
  ip: process.env.IP || undefined,

  port: process.env.PORT || 8080,

  mongo: {
    uri: 'mongodb://localhost/UN-site'
  },

  seedDB: true
};
