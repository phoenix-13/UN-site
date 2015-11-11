'use strict';

import template from './primaryArticles.html!text';
import controller from './primaryArticles.controller';
import './primaryArticles.css!';

export default angular.module('admin.primaryArticles', [])
  .config($stateProvider => {
    $stateProvider
      .state('admin.landingPage.primaryArticles', {
        url: '/primaryArticles',
        template,
        controller,
        controllerAs: 'vm'
      });
  });
