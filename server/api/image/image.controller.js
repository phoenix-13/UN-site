'use strict';

var imageParser = require('./image.parser');
var ImageDao = require('./image.dao');

module.exports = {
  getAll: getAll,
  create: create
};

function getAll() {
  return ImageDao.getAll();
}

function create(imageName) {
  var parsedImage = imageParser.parseImage(imageName);
  return ImageDao.create(parsedImage);
}
