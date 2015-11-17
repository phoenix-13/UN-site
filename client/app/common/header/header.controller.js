'use strict';

export default class {
  constructor($rootScope, $state, ArticleResource) {
    'ngInject';
    this.$state = $state;
    this.ArticleResource= ArticleResource;
    this.search = {max: 256, min: 0};
    this.publications = {items: [], numTotal: 0};
    this.indicators = {items: [], numTotal: 0};
    $rootScope.$on('$stateChangeStart', () => this.cleanSearchState());
  }

  searchArticles(searchText) {
    if (this.searchTextIsInBounds(searchText)) {
      this.ArticleResource
        .searchMainArticles(searchText)
        .then(response => {
          this.publications = response.publications;
          this.indicators = response.indicators;
          $('.search_wrapper_autocomplete').removeClass('hidden');
        });
    } else {
      $('.search_wrapper_autocomplete').addClass('hidden');
    }
  }

  loadArticles(tabIndex) {
    this.cleanSearchState();
    this.$state.go('main.articles', {searchQuery: this.searchText, publicationIndex: 0, indicatorIndex: 0, tabIndex});
  }

  loadPublication(publication) {
    this.cleanSearchState();
    this.$state.go('main.publication', {id: publication._id});
  }

  loadIndicator(indicator) {
    this.cleanSearchState();
    this.$state.go('main.indicator', {id: indicator._id});
  }

  cleanSearchState() {
    $('.search_wrapper_autocomplete').addClass('hidden');
    this.searchText = '';
  }

  searchTextIsInBounds(searchText) {
    return searchText.length > this.search.min && searchText.length < this.search.max;
  }
}
