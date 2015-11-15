'use strict';

export default class {
  constructor(ArticleResource) {
    'ngInject';
    this.ArticleResource= ArticleResource;
    this.search = {max: 256, min: 3};
    this.publications = {items: [], numTotal: 0};
    this.indicators = {items: [], numTotal: 0};
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

  searchTextIsInBounds(searchText) {
    return searchText.length > this.search.min && searchText.length < this.search.max;
  }
}
