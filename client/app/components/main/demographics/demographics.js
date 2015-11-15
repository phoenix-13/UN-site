'use strict';

import template from './demographics.html!text';
import controller from './demographics.controller';
import './demographics.css!';

export default angular.module('main.demographics', [])
  .config($stateProvider => {
    $stateProvider
      .state('main.demographics', {
        url: 'demographics',
        template,
        controller,
        controllerAs: 'vm',
        resolve: {
          demographics: DemographyResource => DemographyResource.getDemographics()
        }
      });
  });
