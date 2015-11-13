'use strict';

var encrypt = require('bcrypt-nodejs');
var Q = require('bluebird');

module.exports = {
  generateHash: generateHash,
  compareHash: compareHash
};

function generateHash(data) {
  return new Q(function (resolve, reject) {
    encrypt.hash(data, null, null, function (err, hash) {
      if (err) {
        reject(new Error(`could not hash data ${data}`));
      } else {
        resolve(hash);
      }
    });
  });
}

function compareHash(data, hash) {
  return new Q(function (resolve, reject) {
    encrypt.compare(data, hash, function (err, res) {
      if (res) {
        resolve(data);
      } else {
        reject(new Error(`hash of ${data} does not equla ${hash}`));
      }
    });
  });
}

