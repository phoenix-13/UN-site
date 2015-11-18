'use strict';

import template from './home.html!text';
import controller from './home.controller';
import './home.css!';

export default angular.module('main.home', [])
.config($stateProvider => {
  $stateProvider
    .state('main.home', {
      url: 'home',
      template,
      controller,
      controllerAs: 'vm',
      resolve: {
        demographics: DemographyResource => DemographyResource.getDemographics()
      }
    });
});
