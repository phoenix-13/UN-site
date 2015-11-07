'use strict';

var imageParser = require('./image.parser');
var ImageDao = require('./image.dao');

module.exports.create = create;

function create(image) {
  var parsedImage = imageParser.parseImage(image);
  return ImageDao.create(parsedImage);
}
