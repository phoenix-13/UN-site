'use strict';

module.exports = {
  parseYearValue
};

function parseYearValue(yearValue) {
  return {
    year: yearValue.year,
    value: yearValue.value
  }
}

