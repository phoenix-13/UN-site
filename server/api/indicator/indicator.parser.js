'use strict';

module.exports = {
  parseCreateIndicator,
  parseUpdateIndicator,
  parseYearValue
};

function parseCreateIndicator(indicator) {
  return {
    title: biling(indicator.title),
    date: indicator.date,
    values: indicator.values,
    content: biling(indicator.content),
    category: indicator.category
  };
}

function parseUpdateIndicator(indicator) {
  return {
    title: biling(indicator.title),
    date: indicator.date,
    content: biling(indicator.content),
    category: indicator.category
  };
}

function parseYearValue(yearValue) {
  return {
    year: yearValue.year,
    value: yearValue.value
  };
}

function biling(value) {
  return {
    geo: value.geo,
    eng: value.eng
  };
}
