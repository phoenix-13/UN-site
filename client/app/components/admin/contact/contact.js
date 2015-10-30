'use strict';

import template from './contact.html!text';
import controller from './contact.controller';
import './contact.css!';

export default angular.module('admin.contact', [])
.config($stateProvider => {
  $stateProvider
    .state('admin.contact', {
      url: 'contact',
      template,
      controller,
      controllerAs: 'vm',
      resolve: {
        contact: $q => $q.when({
          location: {
            latitude: 41.7234113,
            longitude: 44.7685127
          }
        })
      }
    });
});
