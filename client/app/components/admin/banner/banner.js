'use strict';

import template from './banner.html!text';
import controller from './banner.controller';
import './banner.css!';

export default angular.module('admin.banner', [])
  .config($stateProvider => {
    $stateProvider
      .state('admin.landingPage.banner', {
        url: '/banner',
        template,
        controller,
        controllerAs: 'vm'
      });
  });
