'use strict';

var Content = require('./content.dao');
var contentSchemaValidator = require('./content.schema.validator');
var contentParser = require('./content.parser');

module.exports = {
  getOne: getOne,
  updateContacts: updateContacts
};

function getOne() {
  return Content.getOne();
}

function updateContacts(contacts) {
  var parsedContacts = contentParser.parseContacts(contacts);
  return contentSchemaValidator.validateContacts(parsedContacts)
    .then(schemaValidatedContacts => Content.update(schemaValidatedContacts));
}
