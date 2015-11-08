'use strict';

import template from './contact.html!text';
import controller from './contact.controller';
import './contact.css!';

export default angular.module('main.contact', [])
  .config($stateProvider => {
    $stateProvider
      .state('contact', {
        parent: 'main',
        url: 'contact',
        template,
        controller,
        controllerAs: 'vm'
      });
  });
