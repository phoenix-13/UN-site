'use strict';

var ImageDao = require('./image.dao');

module.exports.create = create;

function create(image) {
  return ImageDao.create(image);
}
