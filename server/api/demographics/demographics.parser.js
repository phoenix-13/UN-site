'use strict';

module.exports = {
  parseYearValues
};

function parseYearValues(yearValues) {
  var res = [];
  for (let item of yearValues) {
    let current = { year: item.year, value: item.value };
    res.push(current);
  }
  return res;
}
