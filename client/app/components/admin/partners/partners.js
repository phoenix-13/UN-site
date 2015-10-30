'use strict';

import template from './partners.html!text';
import controller from './partners.controller';
import './partners.css!';

export default angular.module('admin.partners', [])
.config($stateProvider => {
  $stateProvider
    .state('admin.partners', {
      url: '/partners',
      template,
      controller,
      controllerAs: 'vm',
    });
});
