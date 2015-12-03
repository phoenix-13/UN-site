'use strict';

export default class {
  constructor(publication, categories, LangService) {
    'ngInject';
    this.LangService = LangService;
    this.publication = publication;
    this.categories = categories;
    this.initYears();
    this.selectedTab = 1;
  }

  engPublicationExists(){
    return this.LangService.getCurrent() === 'geo'
      || (this.publication.title.eng || this.publication.content.eng);
  }

  initYears() {
    var startYear = 2012;
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
