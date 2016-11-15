'use strict';

var _ = require('lodash');
var uuid = require('node-uuid');


module.exports = {
  cloneStub
};


function cloneStub(stub, uniqueFields) {
  uniqueFields = uniqueFields || [];
  stub = _.cloneDeep(stub);

  for (var field of uniqueFields) {
    var dot = field.indexOf('.');

    if (dot !== -1) {
      var field1 = field.substring(0, dot);
      var field2 = field.substring(dot + 1);
      stub[field1][field2] = `test-${uuid.v4()}`;
    } else {
      stub[field] = `test-${uuid.v4()}`;
    }
  }
  return stub;
}
