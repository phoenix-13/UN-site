'use strict';

import template from './articles.html!text';
import controller from './articles.controller';
import './articles.css!';

export default angular.module('main.articles', [])
  .config($stateProvider => {
    $stateProvider
      .state('articles', {
        parent: 'main',
        url: 'articles',
        template,
        controller,
        controllerAs: 'vm'
      });
  });
