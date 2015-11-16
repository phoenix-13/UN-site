'use strict';

export default class {
  constructor($state, $stateParams, articles, categories) {
    'ngInject';
    this.$state = $state;
    this.query = $stateParams;
    this.selectedTab = this.query.tabIndex;
    this.publications = articles.publications;
    this.indicators = articles.indicators;
    this.categories = categories;
    this.years = this.getIndicatorsCreationYears();
    this.publications.itemsPerPage = this.publications.items.length;
    this.publications.currentPage = parseInt(this.query.publicationIndex) + 1;
    this.indicators.itemsPerPage = this.indicators.items.length;
    this.indicators.currentPage = parseInt(this.query.indicatorIndex) + 1;
    console.log(this.indicators);
  }

  changeCategory(category) {
    if (this.query.categoryId !== category._id) {
      var query = {categoryId: category._id};
      if (this.query.publicationIndex > 0) query.publicationIndex = 0;
      if (this.query.indicatorIndex > 0) query.indicatorIndex = 0;
      if (this.query.tabIndex !== this.selectedTab) query.tabIndex = this.selectedTab;
      this.$state.go('main.articles', query);
    }
  }

  changeYear(year) {
    if (this.query.year !== year) {
      var query = {year: year};
      if (this.query.publicationIndex > 0) query.publicationIndex = 0;
      if (this.query.indicatorIndex > 0) query.indicatorIndex = 0;
      if (this.query.tabIndex !== this.selectedTab) query.tabIndex = this.selectedTab;
      this.$state.go('main.articles', query);
    }
  }

  changePublicationPage() {
    this.$state.go('main.articles', {publicationIndex: this.publications.currentPage - 1});
  }

  changeIndicatorPage() {
    this.$state.go('main.articles', {indicatorIndex: this.indicators.currentPage - 1});
  }

  getIndicatorsCreationYears() {
    var startYear = 2009;
    var stopYear = (new Date).getFullYear();
    return _
      .range(stopYear - startYear + 1)
      .map((elem, index) => startYear + index);
  }
}
