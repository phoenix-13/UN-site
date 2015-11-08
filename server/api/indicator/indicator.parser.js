'use strict';

module.exports = {
  parseIndicator
};

function parseIndicator(indicator) {
  return {
    title: biling(indicator.title),
    date: indicator.date,
    values: indicator.values,
    content: biling(indicator.content),
    category: indicator.category
  };
}

function biling(value) {
  return {
    geo: value.geo,
    eng: value.eng
  };
}
