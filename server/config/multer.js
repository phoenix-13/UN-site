'use strict';

var fs = require('fs');
var getObjectId = require('mongoose').Types.ObjectId;
var options = require('./environment').options;
var uploadsDirectory = require('./environment').paths.uploads;

function isAllowedExtension(extension, allowedExtensions) {
  return allowedExtensions.some(function (elem) {
    return extension.toLowerCase() === elem;
  });
}

var multerOptions = {
  dest: uploadsDirectory,

  limits: {
    fields: options.maxFieldsSize,
    files: options.maxFilesSize
  },

  putSingleFilesInArray: true,

  rename: function (fieldname, filename, req, res) {
    req.fileName = getObjectId().toString();
    return req.fileName;
  },

  onFileUploadStart: function (file, req, res) {
    if (!isAllowedExtension(file.extension, options.allowedExtensions)) {
      req.error = 'extension';
      res.status(400).json({type: 'extension'});
      return false;
    }
  },

  onFileSizeLimit: function (file) {
    file.error = 'size';
    fs.unlink(file.path);
  },

  onFileUploadComplete: function (file, req, res) {
    req.error = file.error;
    req.fileName += '.' + file.extension;
    if (req.error === 'size') {
      res.status(400).json({type: 'size'});
    }
  },

  onParseEnd: function (req, next) {
    if (!req.error) {
      next();
    }
  }
};

module.exports = multerOptions;
