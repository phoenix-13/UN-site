'use strict';

var mongoose = require('mongoose');
var seed = require('../config/seed');


module.exports = {
  DUMMY_ID: '5630670ba1883a2e3c90d3ca',
  DUMMY_ID2: '5630670ba1883a2e3c90d3cb',
  MALFORMED_ID: '',

  DUMMY_EMAIL: 'dummyEmail@gmail.com',

  connectDB,
  clearDB
};


function connectDB() {
  if (!mongoose.connection.db) {
    require('../config/mongoose');
  }
}

function clearDB() {
  return seed.clearDB();
}
