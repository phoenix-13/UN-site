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
      resolve: {
        content: ($q, ContentResource, PublicationResource, IndicatorResource) => {
          var content;
          return ContentResource.getContent()
            .then(resolvedContent => content = resolvedContent)
            .then(() => {
              return $q.all(content.slider.map(slide => {
                if (slide.ref) {
                  if (slide.ref.type === 'publication') {
                    return PublicationResource.getPublication(slide.ref._id)
                      .then(publication => slide.category = publication.category);
                  } else if (slider.ref.type === 'indicator') {
                    return IndicatorResource.getIndicator(slide.ref._id)
                      .then(indicator => slide.category = indicator.category);
                  }
                }
                return {};
              }));
            }).then(() => content);
        },
        categories : CategoryResource => CategoryResource.getCategories(),
        latestPublications: PublicationResource => PublicationResource.getLatestPublications()
      }
    });
});
