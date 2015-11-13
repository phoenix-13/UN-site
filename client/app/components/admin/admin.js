'use strict';

import template from './admin.html!text';
import controller from './admin.controller';
import './admin.css!';

export default angular
  .module('admin', [])
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
          categories: CategoryResource => CategoryResource.getCategories(),
          demographics: DemographyResource => DemographyResource.getDemographics(),
          admin: (AdminResource, $q) => AdminResource.getAdmin()
            .then(user => resolveAdmin($q, user))
        }
      });

    function resolveAdmin($q, user) {
      if (user.role === 'guest') {
        return $q.reject('unauthorizedAdmin');
      } else {
        return $q.resolve(user);
      }
    }
  });
