'use strict';

var fs = require('fs');
var path = require('path');
var fileFolder = require('../../config/environment').paths.uploads;
var fileParser = require('./file.parser');
var File = require('./file.dao');

module.exports = {
  getAll,
  create,
  remove
};

function getAll() {
  return File.getAll();
}

function create(fileName) {
  var parsedFile = fileParser.parseFile(fileName);
  return File.create(parsedFile);
}

function remove(fileId) {
  var file;
  return File.getById(fileId)
    .then(returnedFile => file = returnedFile)
    .then(() => fs.unlink(path.join(fileFolder, file.name)))
    .then(() => File.remove(file.name));
}
