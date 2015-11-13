'use strict';

var encryption = require('../encryption');

describe.only('encryption', () => {
  describe('compareHash', () => {
    it('hash should be equal of data\'s hash', (done) => {
      var data = 'data';
      encryption.generateHash(data)
        .then((hash) => encryption.compareHash(data, hash))
        .then(() => done());
    });

    it('hash should not equal incorrect data hash', (done) => {
      var data = 'data';
      var incorrectData = 'incorrectData';
      encryption.generateHash(data)
        .then((hash) => encryption.compareHash(incorrectData, hash))
        .catch(() => done());
    });
  });
});
