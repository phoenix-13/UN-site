'use strict';

import template from './demography.html!text';
import controller from './demography.controller';
import './demography.css!';

export default angular.module('admin.demography', [])
.config($stateProvider => {
  $stateProvider
    .state('admin.demography', {
      url: 'demography',
      template,
      controller,
      controllerAs: 'vm',
    });
});
