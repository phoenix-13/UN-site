'use strict';

var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var path = require('path');
var config = require('./environment');

module.exports = function (app) {
  var env = app.get('env');

  app.disable('x-powered-by');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());

  if (env === 'production') {
    app.use(express.static(path.join(config.root, 'dist')));
    app.use(express.static(path.join(config.paths.uploads)));
    app.set('appPath', 'dist');
  }

  if (env === 'development' || env === 'test') {
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, './')));
    app.use(express.static(path.join(config.paths.uploads)));
    app.set('appPath', 'client');
  }
};
