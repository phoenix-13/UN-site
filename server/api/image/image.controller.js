'use strict';

var fs = require('fs');
var path = require('path');
var imageFolder = require('../../config/environment').paths.uploads;
var imageParser = require('./image.parser');
var ImageDao = require('./image.dao');

module.exports = {
  remove,
  getAll,
  create
};

function getAll() {
  return ImageDao.getAll();
}

function create(imageName) {
  var parsedImage = imageParser.parseImage(imageName);
  return ImageDao.create(parsedImage);
}

function remove(imageId) {
  var image;
  return ImageDao.getById(imageId)
    .then(returnedImage => image = returnedImage)
    .then(() => fs.unlink(path.join(imageFolder, image.fileName)))
    .then(() => ImageDao.remove(image.fileName));
}
