'use strict';

export default class {
  constructor($state, $stateParams, articles, categories) {
    'ngInject';
    this.$state = $state;
    this.publications = articles.publications;
    this.indicators = articles.indicators;
    this.categories = categories;
    this.query = $stateParams;
    this.years = this.getIndicatorsCreationYears();

    this.publications.itemsPerPage = this.publications.items.length;
    this.publications.currentPage = this.query.publicationsOffset / this.publications.itemsPerPage;
  }

  changeCategory(category) {
    if (this.query.categoryId !== category._id) {
      this.query.categoryId = category._id;
      this.query.publicationsOffset = 0;
      this.query.indicatorsOffset = 0;
      this.$state.go('main.articles', this.query, {reload: true});
    }
  }

  changeYear(year) {
    if (this.query.year !== year) {
      this.query.year = year;
      this.query.publicationsOffset = 0;
      this.query.indicatorsOffset = 0;
      this.$state.go('main.articles', this.query);
    }
  }

  changePublicationPage() {
    console.log('lsdjfsldkjf')
    this.query.publicationsOffset = this.publications.currentPage * this.publications.itemsPerPage;
    this.$state.go('main.articles', this.query);
  }

  getIndicatorsCreationYears() {
    var startYear = 2009;
    var stopYear = (new Date).getFullYear();
    return _
      .range(stopYear - startYear + 1)
      .map((elem, index) => startYear + index);
  }
}
