'use strict';

module.exports = function (app) {
  app.use('/api/content', require('./api/content'));
  app.use('/api/demographics', require('./api/demographics'));
};
