'use strict';

var _ = require('lodash');
var Content = require('../api/content/content.dao');
var Category = require('../api/category/category.dao');
var Demographics = require('../api/demographics/demographics.dao');

module.exports = function () {
  seedContent();
  seedCategories();
  seedDemographics();
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

function seedCategories() {
  var category0 = bilingCategory('მონაწილეობა', 'participation');
  var category1 = bilingCategory('სპეციალური მხარდაჭერა და დაცვა', 'special support and protection');
  var category2 = bilingCategory('ჯანმრთელობა', 'health');
  var category3 = bilingCategory('განათლება, დასაქმება და მობილობა', 'Education, Employment and Mobility');

  Category.removeAll().then(() => Category.create(category0, category1, category2, category3));
}

function bilingCategory(titleGeo, titleEng) {
  return { title: { geo: titleGeo, eng: titleEng } };
}

function seedDemographics() {
  var demographicsArr = [
    bilingDemographics('აფხაზეთი', 'Apkhazeti'),
    bilingDemographics('სამეგრელი - ზემო სვანეთი', 'Samegrelo - Zemo Svaneti'),
    bilingDemographics('გურია', 'Guria'),
    bilingDemographics('აჭარა', 'Ajaria'),
    bilingDemographics('რაჭა - ლეჩხუმი და ქვემო სვანეთი', 'Racha - Lechkhumi and Kvemo Svaneti'),
    bilingDemographics('იმერეთი', 'Imereti'),
    bilingDemographics('სამცხე - ჯავახეთი', 'Samtskhe - Javakheti'),
    bilingDemographics('შიდა ქართლი', 'Shida - Kartli'),
    bilingDemographics('ქვემო ქართლი', 'Kvemo - Kartli'),
    bilingDemographics('თბილისი', 'Tbilisi'),
    bilingDemographics('მცხეთა - მთიანეთი', 'Mtskheta - Mtianeti'),
    bilingDemographics('კახეთი', 'Kakheti')
  ];

  Demographics.removeAll().then(() => Demographics.create(demographicsArr));
}

function bilingDemographics(regionGeo, regionEng) {
  return { region: { geo: regionGeo, eng: regionEng } };
}
