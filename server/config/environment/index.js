'use strict';

var path = require('path');
var _ = require('lodash');

var dataRootPath = path.join(process.env.HOME, '.UN-site-data');

var all = {
  env: process.env.NODE_ENV || 'development',

  root: path.normalize(__dirname + '/../../..'),

  seedDB: false,

  session: {
    expireTimeInSeconds: 60 * 24 * 30 * 1000,
    secret: 'un-site-secret'
  },

  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  hostName: 'http://localhost:8080',

  options: {
    maxFieldsSize: 0,
    maxFilesSize: 1,
    allowedExtensions: ['jpg', 'jpeg', 'png', 'pdf', 'docx', 'xlsx']
  },

  paths: {
    root: dataRootPath,
    log: path.join(dataRootPath, 'log'),
    uploads: path.join(dataRootPath, 'uploads')
  },
};


module.exports = _.merge(
  all,
  require('./' + all.env + '.js') || {});
