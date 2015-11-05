'use strict';

import template from './sitemap.html!text';
import controller from './sitemap.controller';
import './sitemap.css!';

export default angular.module('main.sitemap', [])
  .config($stateProvider => {
    $stateProvider
      .state('main.sitemap', {
        url: 'sitemap',
        template,
        controller,
        controllerAs: 'vm'
      });
  });
