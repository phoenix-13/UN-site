'use strict';

export default class {
  constructor($rootScope, $state, ArticleResource) {
    'ngInject';
    this.$state = $state;
    this.ArticleResource= ArticleResource;
    this.search = {max: 256, min: 0};
    this.articles = {items: [], numTotal: 0};
    $rootScope.$on('$stateChangeStart', () => this.cleanSearchState());
  }

  searchArticles(searchText) {
    if (this.searchTextIsInBounds(searchText)) {
      this.ArticleResource
        .searchMainArticles(searchText)
        .then(response => {
          response.indicators.items.forEach(indicator => indicator.link = 'main.indicator');
          response.publications.items.forEach(publication => publication.link = 'main.publication');
          this.articles.items = response.publications.items.concat(response.indicators.items).slice(0, 5);
          this.articles.numTotal = response.publications.numTotal + response.indicators.numTotal;
          this.boldSearchTextSequences();
          $('.search_wrapper_autocomplete').removeClass('hidden');
        });
    } else {
      $('.search_wrapper_autocomplete').addClass('hidden');
    }
  }

  loadArticles(tabIndex) {
    this.$state.go('main.articles', {
      searchQuery: this.searchText,
      publicationIndex: 0,
      indicatorIndex: 0,
      tabIndex,
      year: undefined,
      categoryId: undefined
    });
    this.cleanSearchState();
  }

  loadArticle(article) {
    this.$state.go(article.link, {id: article._id});
    this.cleanSearchState();
  }

  cleanSearchState() {
    $('.search_wrapper_autocomplete').addClass('hidden');
    this.searchText = '';
  }

  searchTextIsInBounds(searchText) {
    return searchText.length > this.search.min && searchText.length < this.search.max;
  }

  boldSearchTextSequences() {
    this.articles.items.forEach(article => article.title = this.getBoldedSearchTextSequence(article.title, this.searchText));
  }

  getBoldedSearchTextSequence(title, searchText) {
    var searchText = searchText.toLowerCase();
    return {
      geo: this.getBoldedTitle(title.geo.toLowerCase(), searchText),
      eng: this.getBoldedTitle(title.eng.toLowerCase(), searchText)
    }
  }

  getBoldedTitle(title, searchText) {
    var index = title.indexOf(searchText);
    if (index > -1) {
      return title.substring(0, index) + '<b>' + title.substr(index, searchText.length) + '</b>' + title.substring(index + searchText.length);
    }
    return title;
  }
}
