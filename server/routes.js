'use strict';

module.exports = function (app) {
  app.use('/api/content', require('./api/content'));
};
