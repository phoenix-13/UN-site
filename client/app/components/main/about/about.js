'use strict';

import template from './about.html!text';
import controller from './about.controller';
import './about.css!';

export default angular.module('main.about', [])
.config($stateProvider => {
  $stateProvider
    .state('main.about', {
      url: 'about',
      template,
      controller,
      controllerAs: 'vm'
    });
});
