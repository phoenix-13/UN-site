'use strict';

export default class {
  constructor(publication, categories) {
    'ngInject';
    this.publication = publication;
    this.categories = categories;
    this.initYears();
    this.selectedTab = 1;
  }

  initYears() {
    var startYear = 2015;
    var stopYear = (new Date).getFullYear();
    this.years = _
      .range(stopYear - startYear + 1)
      .map((elem, index) => startYear + index);
  }

  getSelectedCategory() {
    return this.categories.filter(category => this.publicationHasCategory(category._id))[0];
  }

  publicationHasCategory(categoryId) {
    return this.publication.categories.some(publicationCategory => publicationCategory === categoryId);
  }
}
