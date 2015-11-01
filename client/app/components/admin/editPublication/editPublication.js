'use strict';

import controller from './editPublicationController.js';
import template from './editPublication.html!text';
import './editPublication.css!';

export default angular.module('admin.publications.edit', [])
  .config(($stateProvider) => {
    $stateProvider
      .state('admin.publications.edit', {
        url: '/edit',
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