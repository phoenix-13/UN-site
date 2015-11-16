'use strict';

import template from './articles.html!text';
import controller from './articles.controller';
import './articles.css!';

export default angular
  .module('main.articles', [])
  .config($stateProvider => {
    $stateProvider.state('main.articles', {
      url: 'articles?searchQuery&categoryId&year&indicatorsOffset&publicationsOffset&tabIndex',
      template,
      controller,
      controllerAs: 'vm',
      resolve: {
        categories: CategoryResource => CategoryResource.getCategories(),
        articles: ($stateParams, ArticleResource) => ArticleResource.searchArticles(parseSearchQuery($stateParams))
      }
    });

    function parseSearchQuery($stateParams) {
      var query = {};
      if ($stateParams.searchQuery) query.searchQuery = $stateParams.searchQuery;
      if ($stateParams.categoryId) query.categoryId = $stateParams.categoryId;
      if ($stateParams.year) query.year = $stateParams.year;
      if ($stateParams.indicatorsOffset) query.indicatorsOffset = $stateParams.indicatorsOffset;
      if ($stateParams.publicationsOffset) query.publicationsOffset = $stateParams.publicationsOffset;
      return query;
    }
  });
