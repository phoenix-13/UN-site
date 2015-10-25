'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');

var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);

server.listen(config.port, config.ip, () => {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));

  if (config.env === 'development') {
    require('ripe').ready();
  }
})
.on('error', e => {
  console.error(e);
  process.exit(1);
});


app.route('/*')
  .get((req, res) => {
    res.sendFile(app.get('appPath') + '/index.html', {root: config.root});
  });
