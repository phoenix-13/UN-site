'use strict';

var contentDao = require('../api/content/content.dao');

module.exports = function () {
  var content = {
    contacts: {
      address: {
        geo: 'თბილისი ჭავჭავაძის 46,',
        eng: 'Tbilisi chavchavadze ave 46,'
      },
      phones: ['(+995 32) 2222222', '(+995 32) 3222222'],
      fax: '(+995 32) 3333333',
      mail: 'gkochakidze@gmail.com',
      coordinates: {
        latitude: 41.7234113,
        longitude: 44.7685127
      }
    }
  };
  contentDao.removeOne()
    .then(() => contentDao.create(content));
};
