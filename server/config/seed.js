'use strict';

var _ = require('lodash');
var Content = require('../api/content/content.dao');

module.exports = function () {
  seedContent();
};

function seedContent() {
  var featured = _.range(6).map(function() { return {}; });
  var banner = {
    title: {
      geo: 'ახალგაზრდობის ინდექსი',
      eng: 'youth index'
    },
    image: 'http://pre00.deviantart.net/d929/th/pre/i/2012/332/2/5/phoenix_by_darkheroic-d5g7m4m.png',
    link: 'https://www.youtube.com/watch?v=HgzGwKwLmgM'
  };
  var contacts = {
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
  };

  var content = {
    featured,
    banner,
    contacts
  };

  Content.removeAll().then(() => Content.create(content));
}
