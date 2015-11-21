'use strict';

var _ = require('lodash');
var Q = require('bluebird');
var ObjectId = require('mongoose').Types.ObjectId;
var Content = require('../api/content/content.dao');
var Category = require('../api/category/category.dao');
var Demographics = require('../api/demographics/demographics.dao');
var Indicator = require('../api/indicator/indicator.dao');
var Publication = require('../api/publication/publication.dao');
var Admin = require('../api/admin/admin.dao');

module.exports = function () {
  seedAdmins()
    .then(() => seedCategories())
    //.then(() => seedDemographics())
    .then(() => seedContent())
    .then(() => Q.all([
      seedIndicators(),
      seedPublications()
    ]))
    //.spread((indicators, publications) => seedContent(indicators, publications));
};

function seedContent(indicators, publications) {
  var featured = _
    .range(6)
    .map(() => {
      return {
        title: {eng: 'Lorem Ipsum', geo: 'Lorem Ipsum'},
        ref: {}
      };
    });

  var banner = {
    title: {
      geo: 'ახალგაზრდობის ინდექსი',
      eng: 'youth index'
    },
    image: 'http://thumb9.shutterstock.com/display_pic_with_logo/675421/327855152/stock-vector-happy-diwali-burning-diya-eps-327855152.jpg',
    link: 'https://www.youtube.com/watch?v=HgzGwKwLmgM'
  };

  var contacts = {
    address: {
      geo: '',
      eng: ''
    },
    phones: [],
    fax: '',
    mail: '',
    coordinates: {
      latitude: 41.7234113,
      longitude: 44.7685127
    }
  };

  var about = {
    geo: '',
    eng: ''
  };

  var content = {
    about,
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
  var category3 = bilingCategory('ახალგაზრდები და ოჯახი', 'children and family');
  var category4 = bilingCategory('განათლება, დასაქმება და მობილობა', 'Education, Employment and Mobility');

  return Category.removeAll().then(() => Category.create(category0, category1, category2, category3, category4));
}

function bilingCategory(titleGeo, titleEng) {
  return { title: { geo: titleGeo, eng: titleEng } };
}

function seedDemographics() {
  var demographicsArr = [{
    region: {
      geo: 'აფხაზეთი',
      eng: 'Apkhazeti'
    },
    values: []
  }, {
    region: {
      geo: 'სამეგრელი - ზემო სვანეთი',
      eng: 'Samegrelo - Zemo Svaneti'
    },
    values: []
  }, {
    region: {
      geo: 'გურია',
      eng: 'Guria'
    },
    values: []
  }, {
    region: {
      geo: 'აჭარა',
      eng: 'Ajaria'
    },
    values: []
  }, {
    region: {
      geo: 'რაჭა - ლეჩხუმი და ქვემო სვანეთი',
      eng: 'Racha - Lechkhumi and Kvemo Svaneti'
    },
    values: []
  }, {
    region: {
      geo: 'იმერეთი',
      eng: 'Imereti'
    },
    values: []
  }, {
    region: {
      geo: 'სამცხე - ჯავახეთი',
      eng: 'Samtskhe - Javakheti'
    },
    values: []
  }, {
    region: {
      geo: 'შიდა ქართლი',
      eng: 'Shida - Kartli'
    },
    values: []
  }, {
    region: {
      geo: 'ქვემო ქართლი',
      eng: 'Kvemo - Kartli'
    },
    values: []
  }, {
    region: {
      geo: 'თბილისი',
      eng: 'Tbilisi'
    },
    values: []
  }, {
    region: {
      geo: 'მცხეთა - მთიანეთი',
      eng: 'Mtskheta - Mtianeti'
    },
    values: []
  }, {
    region: {
      geo: 'კახეთი',
      eng: 'Kakheti'
    },
    values: []
  }];

  return Demographics.removeAll().then(() => Demographics.create(demographicsArr));
}

function seedIndicators() {
  return Indicator.removeAll()
    .then(() => Category.getAll())
    .then(categories => {
      var indicators = generateIndicators(categories);
      return Indicator.create(indicators);
    });
}

function generateIndicators(categories) {
  return _.flatten(categories.map((category, categoryIndex) => {
    return _.range(100).map((elem, elemIndex) => getIndicator(categoryIndex * 100 + elemIndex + 1, category._id))
  }));
}

function getIndicator(index, categoryId) {
  return {
    title: {
      geo: `${index} Lorem Ipsum საბეჭდი და ტიპოგრაფიული `,
      eng: `${index} Lorem Ipsum is simply!`,
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
  return Publication.removeAll()
    .then(() => Category.getAll())
    .then(categories => {
      var publications = generatePublications(categories);
      return Publication.create(publications);
    });
}

function generatePublications(categories) {
  return _.flatten(categories.map((category, categoryIndex) => {
    return _.range(100).map((elem, elemIndex) =>
      getPublication(100 * categoryIndex + elemIndex + 1, categories[categoryIndex], categories[(categoryIndex + 1) % categories.length]));
  }));
}

function getPublication(index, categoryId1, categoryId2) {
  return {
    title: {
      geo: `${index} Lorem Ipsum საბეჭდი და ტიპოგრაფიული `,
      eng: `${index} Lorem Ipsum is simply!`,
    },
    content: {
      geo: `<p>Lorem Ipsum საბეჭდი და ტიპოგრაფიული ინდუსტრიის უშინაარსო ტექსტია. იგი სტანდარტად 1500-იანი წლებიდან იქცა, როდესაც უცნობმა მბეჭდავმა ამწყობ დაზგაზე წიგნის საცდელი ეგზემპლარი დაბეჭდა. მისი ტექსტი არამარტო 5 საუკუნის მანძილზე შემორჩა, არამედ მან დღემდე, ელექტრონული ტიპოგრაფიის დრომდეც უცვლელად მოაღწია. განსაკუთრებული პოპულარობა მას 1960-იან წლებში გამოსულმა Letraset-ის ცნობილმა ტრაფარეტებმა მოუტანა, უფრო მოგვიანებით კი — Aldus PageMaker-ის ტიპის საგამომცემლო პროგრამებმა, რომლებშიც Lorem Ipsum-ის სხვადასხვა ვერსიები იყო ჩაშენებული.</p>`,
      eng: `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`
    },
    date: Date.now(),
    categories: [categoryId1, categoryId2],
    year: (new Date()).getFullYear()
  }
}

var seedAdmins = function () {
  return Admin.removeAll()
    .then(() => Admin.create('name', 'password'));
}
