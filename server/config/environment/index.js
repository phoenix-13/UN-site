'use strict';

var path = require('path');
var _ = require('lodash');

var dataRootPath = path.join(process.env.HOME, '.UN-site-data');
var ObjectId = require('mongoose').Types.ObjectId;

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

  imageOptions: {
    maxFileSize: 5000000,
    maxFieldsSize: 0,
    maxFilesSize: 1,
    allowedExtensions: ['jpg', 'jpeg', 'png']
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
