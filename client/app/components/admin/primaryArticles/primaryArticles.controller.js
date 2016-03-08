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
      if (article.ref._id) {
        article.selectedArticle = article.ref;
      } else {
        article.searchText = article.link;
      }
    });
  }

  updatePrimaryArticles() {
    this.primaryArticles.forEach(article => {
      if (article.selectedArticle) {
        article.ref = article.selectedArticle;
        article.link = '';
      } else {
        article.link = article.searchText || '';
        article.ref = article.ref || {};
      }
    });
    this.ContentResource.updatePrimaryArticles({featured: this.primaryArticles})
      .then(() => {
        this.Toast.show('Primary Articles Update!');
        this.$state.reload();
      })
  }

  searchArticles(searchText) {
    if (searchText && searchText.length > 0) {
      var deferred = this.$q.defer();
      this.ArticleResource.searchAdminArticles(searchText)
        .then(articles => this.parseArticles(articles))
        .then(parsedArticles => deferred.resolve(parsedArticles));
      return deferred.promise;
    } else {
      return [];
    }
  }

  parseArticles(articles) {
    var parsedArticles = [];
    articles.indicators.items.forEach(indicator => {
      parsedArticles.push(this.getArticle(indicator, 'indicator'))
    });
    articles.publications.items.forEach(publication => {
      parsedArticles.push(this.getArticle(publication, 'publication'))
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
