'use strict';

module.exports = {
  parsePublication
};

function parsePublication(publication) {
  return {
    title: biling(publication.title),
    date: publication.date,
    content: biling(publication.content),
    categories: publication.categories
  };
}

function biling(value) {
  return {
    geo: value.geo,
    eng: value.eng
  };
}
