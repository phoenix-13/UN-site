'use strict';

import template from './files.html!text';
import controller from './files.controller';
import './files.css!';

export default angular.module('admin.files', [])
  .config($stateProvider => {
    $stateProvider
      .state('admin.files', {
        url: 'files',
        template,
        controller,
        controllerAs: 'vm',
        resolve: {
          storage: StorageResource => StorageResource.getFiles()
        }
      });
  });
