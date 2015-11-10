'use strict';

import template from './publications.html!text';
import controller from './publications.controller';
import './publications.css!';

export default angular.module('main.publications', [])
  .config($stateProvider => {
    $stateProvider
      .state('publications', {
        parent: 'main',
        url: 'publications',
        template,
        controller,
        controllerAs: 'vm'
      });
  });
