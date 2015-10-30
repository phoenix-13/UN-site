'use strict';

import controller from './addPublicationController.js';
import template from './addPublication.html!text';
import './addPublication.css!';

export default angular.module('admin.publications.add', [])
  .config(($stateProvider) => {
    $stateProvider
      .state('admin.publications.add', {
        url: '/add',
        onEnter: ($mdDialog, $state) => {
          $mdDialog.show({
            template,
            controller,
            controllerAs: 'vm',
            escapeToClose: true,
            clickOutsideToClose: true
          }).finally(() => $state.go('^'));
        }
      });
  });