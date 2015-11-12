'use strict';

import template from './login.html!text';
import controller from './login.controller';
import './login.css!';

export default angular.module('admin.login', [])
  .config($stateProvider => {
    $stateProvider
      .state('login', {
        parent: 'admin',
        url: 'login',
        template,
        controller,
        controllerAs: 'vm'
      });
  });
