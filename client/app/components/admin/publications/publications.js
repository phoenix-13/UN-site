'use strict';

import template from './publications.html!text';
import controller from './publications.controller';
import './publications.css!';

export default angular.module('admin.publications', [])
.config($stateProvider => {
  $stateProvider
    .state('admin.publications', {
      url: '/publications',
      template,
      controller,
      controllerAs: 'vm',
    });
});
