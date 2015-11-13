'use strict';

module.exports = function (app) {
  app.use('/api/contents', require('./api/content'));
  app.use('/api/demographics', require('./api/demographics'));
  app.use('/api/categories', require('./api/category'));
  app.use('/api/publications', require('./api/publication'));
  app.use('/api/indicators', require('./api/indicator'));
  app.use('/api/images', require('./api/image'));
  app.use('/api/search', require('./api/search'));
};
