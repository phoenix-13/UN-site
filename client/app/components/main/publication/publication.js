'use strict';

import template from './publication.html!text';
import controller from './publication.controller';
import './publication.css!';

export default angular.module('main.publication', [])
  .config($stateProvider => {
    $stateProvider
      .state('main.publication', {
        url: 'publication/:id',
        template,
        controller,
        controllerAs: 'vm'
      });
  });
