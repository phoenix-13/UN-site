'use strict';

import template from './indicator.html!text';
import controller from './indicator.controller';
import './indicator.css!';

export default angular.module('main.indicator', [])
  .config($stateProvider => {
    $stateProvider
      .state('main.indicator', {
        url: 'indicator/:id',
        template,
        controller,
        controllerAs: 'vm',
        resolve: {
          indicator: ($stateParams, IndicatorResource) => IndicatorResource.getIndicator($stateParams.id)
        }
      });
  });
