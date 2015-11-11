'use strict';

import template from './slider.html!text';
import controller from './slider.controller';
import './slider.css!';

export default angular.module('admin.slider', [])
  .config($stateProvider => {
    $stateProvider
      .state('admin.landingPage.slider', {
        url: '/slider',
        template,
        controller,
        controllerAs: 'vm'
      });
  });
