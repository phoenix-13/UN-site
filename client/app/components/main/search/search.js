'use strict';

import template from './search.html!text';
import controller from './search.controller';
import './search.css!';

export default angular.module('main.search', [])
  .config($stateProvider => {
    $stateProvider
      .state('search', {
        parent: 'main',
        url: 'search',
        template,
        controller,
        controllerAs: 'vm'
      });
  });
