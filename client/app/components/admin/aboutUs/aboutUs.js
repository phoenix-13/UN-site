'use strict';

import template from './aboutUs.html!text';
import controller from './aboutUs.controller';
import './aboutUs.css!';

export default angular.module('admin.aboutUs', [])
.config($stateProvider => {
  $stateProvider
    .state('admin.aboutUs', {
      url: '/aboutUs',
      template,
      controller,
      controllerAs: 'vm',
    });
});
