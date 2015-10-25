'use strict';

var config = require('./environment');
var fs = require('fs');


module.exports = function () {
  try {
    fs.mkdirSync(config.paths.root);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }

  try {
    fs.mkdirSync(config.paths.log);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }

  try {
    fs.mkdirSync(config.paths.uploads);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }
};
