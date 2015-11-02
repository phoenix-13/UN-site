'use strict';

import controller from './editIndicatorController';
import template from './editIndicator.html!text';
import './editIndicator.css!';

export default angular.module('admin.indicators.edit', [])
  .config($stateProvider => {
    $stateProvider
      .state('admin.indicators.edit', {
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
      })
  });
