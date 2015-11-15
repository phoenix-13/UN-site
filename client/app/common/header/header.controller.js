'use strict';

export default class {
  constructor(ArticleResource) {
    'ngInject';
    this.ArticleResource= ArticleResource;
    this.search = {max: 256, min: 3};
    this.articles = [];
  }

  searchArticles(searchText) {
    if (this.searchTextIsInBounds(searchText)) {
      this.ArticleResource
        .searchMainArticles(searchText)
        .then(searchedArticles => this.articles = searchedArticles);
    }
  }

  searchTextIsInBounds(searchText) {
    return searchText.length > this.search.min && searchText.length < this.search.max;
  }
}
