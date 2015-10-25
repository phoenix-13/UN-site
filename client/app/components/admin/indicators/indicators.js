'use strict';

import template from './indicators.html!text';
import controller from './indicators.controller';
import './indicators.css!';

export default angular.module('admin.indicators', [])
.config($stateProvider => {
  $stateProvider
    .state('admin.indicators', {
      url: 'indicators',
      template,
      controller,
      controllerAs: 'vm',
    });
});
