'use strict';

var Q = require('bluebird');
var mongoose = require('mongoose');
var config = require('./environment');
Q.promisifyAll(mongoose);

mongoose.connect(config.mongo.uri, config.mongo.options);
console.log(`${config.mongo.uri} connected to mongoose`);