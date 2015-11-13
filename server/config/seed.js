'use strict';

var _ = require('lodash');
var Content = require('../api/content/content.dao');
var Category = require('../api/category/category.dao');
var Demographics = require('../api/demographics/demographics.dao');
var Indicators = require('../api/indicator/indicator.dao');
var Publications = require('../api/publication/publication.dao');

module.exports = function () {
  seedContent()
    .then(() => seedCategories())
    .then(() => seedDemographics())
    .then(() => seedIndicators())
    .then(() => seedPublications());
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

  return Content.removeAll().then(() => Content.create(content));
}

function seedCategories() {
  var category0 = bilingCategory('მონაწილეობა', 'participation');
  var category1 = bilingCategory('სპეციალური მხარდაჭერა და დაცვა', 'special support and protection');
  var category2 = bilingCategory('ჯანმრთელობა', 'health');
  var category3 = bilingCategory('განათლება, დასაქმება და მობილობა', 'Education, Employment and Mobility');

  return Category.removeAll().then(() => Category.create(category0, category1, category2, category3));
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

  return Demographics.removeAll().then(() => Demographics.create(demographicsArr));
}

function bilingDemographics(regionGeo, regionEng) {
  return { region: { geo: regionGeo, eng: regionEng } };
}

function seedIndicators() {
  return Indicators.removeAll()
    .then(() => Category.getAll())
    .then(categories => {
      var indicators = generateIndicators(categories);
      console.log(indicators.length);
      return Indicators.create(indicators);
    });
}

function generateIndicators(categories) {
  return _.flatten(categories.map(category => {
    return _.range(100).map(() => getIndicator(category._id))
  }));
}

function getIndicator(categoryId) {
  return {
    title: {
      geo: 'Lorem Ipsum საბეჭდი და ტიპოგრაფიული ',
      eng: 'Lorem Ipsum is simply!',
    },
    content: {
      geo: `<p>Lorem Ipsum საბეჭდი და ტიპოგრაფიული ინდუსტრიის უშინაარსო ტექსტია. იგი სტანდარტად 1500-იანი წლებიდან იქცა, როდესაც უცნობმა მბეჭდავმა ამწყობ დაზგაზე წიგნის საცდელი ეგზემპლარი დაბეჭდა. მისი ტექსტი არამარტო 5 საუკუნის მანძილზე შემორჩა, არამედ მან დღემდე, ელექტრონული ტიპოგრაფიის დრომდეც უცვლელად მოაღწია. განსაკუთრებული პოპულარობა მას 1960-იან წლებში გამოსულმა Letraset-ის ცნობილმა ტრაფარეტებმა მოუტანა, უფრო მოგვიანებით კი — Aldus PageMaker-ის ტიპის საგამომცემლო პროგრამებმა, რომლებშიც Lorem Ipsum-ის სხვადასხვა ვერსიები იყო ჩაშენებული.</p>`,
      eng: `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`
    },
    date: Date.now(),
    category: categoryId,
    values: [
      {year: 2009, value: 4},
      {year: 2011, value: 6},
      {year: 2013, value: 5},
      {year: 2016, value: 7},
      {year: 2017, value: 12},
    ]
  }
}

function seedPublications() {
  return Publications.removeAll()
    .then(() => Category.getAll())
    .then(categories => {
      var publications = generatePublications(categories);
      return Publications.create(publications);
    });
}

function generatePublications(categories) {
  return _.flatten(categories.map(category => {
    return _.range(100).map(() => getPublication(category._id))
  }));
}

function getPublication(categoryId) {
  return {
    title: {
      geo: 'Lorem Ipsum საბეჭდი და ტიპოგრაფიული ',
      eng: 'Lorem Ipsum is simply!',
    },
    content: {
      geo: `<p>Lorem Ipsum საბეჭდი და ტიპოგრაფიული ინდუსტრიის უშინაარსო ტექსტია. იგი სტანდარტად 1500-იანი წლებიდან იქცა, როდესაც უცნობმა მბეჭდავმა ამწყობ დაზგაზე წიგნის საცდელი ეგზემპლარი დაბეჭდა. მისი ტექსტი არამარტო 5 საუკუნის მანძილზე შემორჩა, არამედ მან დღემდე, ელექტრონული ტიპოგრაფიის დრომდეც უცვლელად მოაღწია. განსაკუთრებული პოპულარობა მას 1960-იან წლებში გამოსულმა Letraset-ის ცნობილმა ტრაფარეტებმა მოუტანა, უფრო მოგვიანებით კი — Aldus PageMaker-ის ტიპის საგამომცემლო პროგრამებმა, რომლებშიც Lorem Ipsum-ის სხვადასხვა ვერსიები იყო ჩაშენებული.</p>`,
      eng: `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`
    },
    date: Date.now(),
    category: categoryId
  }
}


