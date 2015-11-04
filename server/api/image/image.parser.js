'use strict';

module.exports = {
  parseImage: parseImage
};

function parseImage(data) {
  return { image: data.image };
}
