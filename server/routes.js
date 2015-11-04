'use strict';

module.exports = function (app) {
  app.use('/api/content', require('./api/content'));
  app.use('/api/demographics', require('./api/demographics'));
  app.use('/api/publications', require('./api/publication'));
  app.use('/api/indicators', require('./api/indicator'));
};
