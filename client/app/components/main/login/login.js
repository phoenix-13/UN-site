'use strict';

import template from './login.html!text';
import controller from './login.controller.js';
import './login.css!';

export default angular.module('admin.login', [])
  .config($stateProvider => {
    $stateProvider
      .state('main.login', {
        url: 'login',
        template,
        controller,
        controllerAs: 'vm'
      });
  });
