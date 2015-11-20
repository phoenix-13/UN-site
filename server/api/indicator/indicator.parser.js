'use strict';

module.exports = {
  parseIndicator
};

function parseIndicator(indicator) {
  return {
    title: biling(indicator.title),
    date: indicator.date,
    values: extractIds(indicator.values),
    content: biling(indicator.content),
    category: indicator.category
    // categories: indicator.categories
  };
}

function biling(value) {
  return {
    geo: value.geo,
    eng: value.eng
  };
}

function extractIds(pairs) {
  return pairs.map(pair => {
    return {
      year: pair.year,
      value: pair.value
    }
  });
}
