'use strict';

import template from './indicators.html!text';
import controller from './indicators.controller';
import './indicators.css!';

export default angular.module('main.indicators', [])
  .config($stateProvider => {
    $stateProvider
      .state('indicators', {
        parent: 'main',
        url: 'indicators',
        template,
        controller,
        controllerAs: 'vm'
      });
  });
