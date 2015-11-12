'use strict';

var Category = require('./category.dao');

module.exports = {
  getAll
};

function getAll() {
  return Category.getAll();
}
