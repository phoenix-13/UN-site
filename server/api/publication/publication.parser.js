'use strict';

module.exports = {
  parsePublication: parsePublication
};

function parsePublication(publication) {
  return {
    title: publication.title,
    date: publication.date,
    year: publication.year,
    description: publication.description,
    content: publication.content
  };
}
