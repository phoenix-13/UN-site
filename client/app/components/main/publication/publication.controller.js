'use strict';

export default class {
  constructor(publication, categories) {
    'ngInject';
    this.publication = publication;
    this.categories = categories;
    this.initYears();
  }

  initYears() {
    var startYear = 2009;
    var stopYear = (new Date).getFullYear();
    this.years = _
      .range(stopYear - startYear + 1)
      .map((elem, index) => startYear + index);
  }
}
