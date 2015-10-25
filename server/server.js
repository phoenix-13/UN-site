'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');

require('./config/mongoose');

var app = express();
var server = require('http').createServer(app);

require('./config/directories')();
require('./config/express')(app);
require('./config/seed')();
require('./routes')(app);

server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  if (config.env === 'development') {
    require('ripe').ready();
  }
})
.on('error', function (e) {
  console.error(e);
  process.exit(1);
});

app.route('/*')
  .get(function (req, res) {
    res.sendFile(app.get('appPath') + '/index.html', {root: config.root});
  });

