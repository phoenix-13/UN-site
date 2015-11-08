'use strict';

import template from './indicator.html!text';
import controller from './indicator.controller';
import './indicator.css!';

export default angular.module('main.indicator', [])
  .config($stateProvider => {
    $stateProvider
      .state('indicator', {
        parent: 'main',
        url: 'indicator',
        template,
        controller,
        controllerAs: 'vm'
      });
  });
