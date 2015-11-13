'use strict';

import template from './indicators.html!text';
import controller from './indicators.controller';
import './indicators.css!';

export default angular.module('admin.indicators', [])
.config($stateProvider => {
  $stateProvider
    .state('admin.indicators', {
      url: '/indicators/:pageIndex',
      template,
      controller,
      controllerAs: 'vm',
      resolve: {
        indicators: (IndicatorResource, $stateParams) => IndicatorResource.getIndicatorsLimited(($stateParams.pageIndex -1) * 10)
      }
    });
});
