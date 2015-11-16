'use strict';

export default class {
  constructor($state, $stateParams, articles, categories) {
    'ngInject';
    this.$state = $state;
    this.query = $stateParams;
    this.selectedTab = this.query.tabIndex;
    this.categories = categories;
    this.initYears();
    this.initPublications(articles);
    this.initIndicators(articles);
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

  changePublicationPage = () => this.$state.go('main.articles', {publicationIndex: this.publications.currentPage - 1});

  changeIndicatorPage = () => this.$state.go('main.articles', {indicatorIndex: this.indicators.currentPage - 1});

  initYears() {
    var startYear = 2009;
    var stopYear = (new Date).getFullYear();
    this.years = _
      .range(stopYear - startYear + 1)
      .map((elem, index) => startYear + index);
  }

  initIndicators(articles) {
    this.indicators = articles.indicators;
    this.indicators.itemsPerPage = this.indicators.items.length;
    this.indicators.currentPage = parseInt(this.query.indicatorIndex) + 1;
  }

  initPublications(articles) {
    this.publications = articles.publications;
    this.publications.itemsPerPage = this.publications.items.length;
    this.publications.currentPage = parseInt(this.query.publicationIndex) + 1;
  }
}
