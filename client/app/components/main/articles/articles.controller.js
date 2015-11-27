'use strict';

export default class {
  constructor($timeout, $state, $stateParams, articles, categories) {
    'ngInject';
    this.$state = $state;
    this.query = $stateParams;
    this.selectedTab = this.query.tabIndex;
    this.categories = categories;
    this.initYears();
    this.initPublications(articles);
    this.initIndicators(articles);
    this.initIndicatorYearBounds();
    this.indexIndicatorsByYear();
    $timeout(() => $('.recent_publications *').removeAttr('style'));
  }

  getSelectedCategory() {
    return this.categories.filter(category => category._id === this.query.categoryId)[0];
  }

  isSearchResult() {
    return this.query.searchQuery && this.query.searchQuery.length > 0;
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

  changePublicationPage = () => {
    var query = {publicationIndex: this.publications.currentPage - 1};
    if (this.query.tabIndex !== this.selectedTab) query.tabIndex = this.selectedTab;
    this.$state.go('main.articles', query);
  }

  changeIndicatorPage = () => {
    var query = {indicatorIndex: this.indicators.currentPage - 1};
    if (this.query.tabIndex !== this.selectedTab) query.tabIndex = this.selectedTab;
    this.$state.go('main.articles', query);
  }

  initYears() {
    var startYear = 2015;
    var stopYear = (new Date).getFullYear();
    this.years = _
      .range(stopYear - startYear + 1)
      .map((elem, index) => startYear + index);
  }

  initIndicators(articles) {
    this.indicators = articles.indicators;
    this.indicators.itemsPerPage = 5;
    this.indicators.currentPage = parseInt(this.query.indicatorIndex) + 1;
  }

  initPublications(articles) {
    this.publications = articles.publications;
    this.publications.itemsPerPage = 5;
    this.publications.currentPage = parseInt(this.query.publicationIndex) + 1;
  }

  initIndicatorYearBounds() {
    var minYear = (new Date()).getFullYear();
    var maxYear = 2015;
    for (var indicator of this.indicators.items) {
      indicator.values.forEach(pair => {
        if (pair.year > maxYear) {
          maxYear = pair.year;
        }
        if (pair.year < minYear) {
          minYear = pair.year;
        }
      });
    }
    if (minYear > maxYear) {
      this.indicatorYears = [];
    } else {
      this.indicatorYears = _
        .range(maxYear - minYear + 1)
        .map((elem, index) => minYear + index);
    }
  }

  indexIndicatorsByYear = () => {
    for (var indicator of this.indicators.items) {
      indicator.valuesMap = _.indexBy(indicator.values, 'year');
    }
  }
}
