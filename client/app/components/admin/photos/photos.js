'use strict';

import template from './photos.html!text';
import controller from './photos.controller';
import './photos.css!';

export default angular.module('admin.photos', [])
.config($stateProvider => {
  $stateProvider
    .state('admin.photos', {
      url: '/photos',
      template,
      controller,
      controllerAs: 'vm'
    });
});
