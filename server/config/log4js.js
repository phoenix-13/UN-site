'use strict';

var config = require('./environment');
var path = require('path');

module.exports = function(log4js) {
  var fileName = process.env.NODE_ENV + '.log';

  log4js.configure({
    appenders: [{
      type: 'console',
      category: 'log'
    }, {
      type: 'file',
      filename: path.join(config.paths.log, fileName),
      category: ['http', 'log']
    }]
  });
};
