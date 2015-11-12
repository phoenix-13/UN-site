'use strict';

import template from './admin.html!text';
import controller from './admin.controller';
import './admin.css!';

export default angular.module('admin', [])
.config($stateProvider => {
  $stateProvider
    .state('admin', {
      url: '/admin',
      template,
      controller,
      controllerAs: 'vm',
      abstract: true,
      resolve: {
        content: ContentResource => ContentResource.getContent(),
        indicators: IndicatorResource => IndicatorResource.getIndicators(),
        categories: CategoryResource => CategoryResource.getCategories(),
        publications: PublicationResource => PublicationResource.getPublications(),
        demographics: DemographyResource => DemographyResource.getDemographics()
      }
    });
});
