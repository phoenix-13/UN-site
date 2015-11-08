'use strict';

import template from './publication.html!text';
import controller from './publication.controller';
import './publication.css!';

export default angular.module('main.publication', [])
  .config($stateProvider => {
    $stateProvider
      .state('publication', {
        parent: 'main',
        url: 'publication',
        template,
        controller,
        controllerAs: 'vm'
      });
  });
