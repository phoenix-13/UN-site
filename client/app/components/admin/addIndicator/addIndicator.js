'use strict';

import controller from './addIndicatorController';
import template from './addIndicator.html!text';
import './addIndicator.css!';

export default angular.module('admin.indicators.add', [])
  .config($stateProvider => {
    $stateProvider
      .state('admin.indicators.add', {
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
      })
  });
