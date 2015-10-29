'use strict';

import onEnter from './addIndicatorController';

export default angular.module('admin.indicators.add', [])
  .config($stateProvider => {
    $stateProvider.state('admin.indicators.add', {
        url: 'add/',
        onEnter
      });
  });
