'use strict';

import template from './main.html!text';
import controller from './main.controller';
import './main.css!';

export default angular.module('main', [])
.config($stateProvider => {
  $stateProvider
    .state('main', {
      url: '/',
      template,
      controller,
      controllerAs: 'vm',
    });
});
