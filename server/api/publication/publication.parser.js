'use strict';

module.exports = {
  parsePublication
};

function parsePublication(publication) {
  return {
    title: biling(publication.title),
    date: publication.date,
    content: biling(publication.content),
    category: publication.category
  };
}

function biling(value) {
  return {
    geo: value.geo,
    eng: value.eng
  };
}
