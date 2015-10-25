'use strict';

import template from './users.html!text';
import controller from './users.controller';
import './users.css!';

export default angular.module('admin.users', [])
.config($stateProvider => {
  $stateProvider
    .state('admin.users', {
      url: 'users',
      template,
      controller,
      controllerAs: 'vm',
    });
});
