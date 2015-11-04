'use strict';

module.exports = {
  parsePublication: parsePublication
};

function parsePublication(publication) {
  return {
    title: publication.title,
    date: publication.date,
    content: publication.content
  };
}
