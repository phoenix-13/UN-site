'use strict';

import template from './landingPage.html!text';
import controller from './landingPage.controller';
import './landingPage.css!';

export default angular.module('admin.landingPage', [])
.config($stateProvider => {
  $stateProvider
    .state('admin.landingPage', {
      url: '/landingPage',
      template,
      controller,
      controllerAs: 'vm',
    });
});
