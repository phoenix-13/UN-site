'use strict';

export default class {
  constructor($state, $q, ArticleResource, ContentResource, Toast, content) {
    'ngInject';
    this.$state = $state;
    this.$q = $q;
    this.ArticleResource = ArticleResource;
    this.ContentResource = ContentResource;
    this.Toast = Toast;
    this.primaryArticles = content.featured;
    this.primaryArticles.forEach(article => {
      if (article.ref.type.length !== 0) {
        article.selectedArticle = article.ref;
      }
    });
  }

  updatePrimaryArticles() {
    this.primaryArticles.forEach(article => article.ref = article.selectedArticle || article.ref);
    this.ContentResource.updatePrimaryArticles({featured: this.primaryArticles})
      .then(() => {
        this.Toast.show('Primary Articles Update!');
        this.$state.reload();
      })
  }

  searchArticles(searchText) {
    if (searchText && searchText.length > 3) {
      var deferred = this.$q.defer();
      this.ArticleResource.searchAdminArticles(searchText)
        .then(articles => this.parseArticles(articles))
        .then(parsedArticles => deferred.resolve(parsedArticles));
      return deferred.promise;
    } else {
      return [];
    }
  };

  parseArticles(articles) {
    var parsedArticles = [];
    articles.indicators.items.forEach(indicator => {
      parsedArticles.push(this.getArticle(indicator, 'indicators'))
    });
    articles.publications.items.forEach(publication => {
      parsedArticles.push(this.getArticle(publication, 'publications'))
    });
    return parsedArticles;
  }

  getArticle(article, type) {
    return {
      type: type,
      title: article.title.geo,
      _id: article._id
    }
  }
}
