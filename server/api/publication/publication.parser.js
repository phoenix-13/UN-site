'use strict';

module.exports = {
  parsePublication
};

function parsePublication(publication) {
  return {
    title: publication.title,
    date: publication.date,
    content: publication.content,
    category: publication.category
  };
}
