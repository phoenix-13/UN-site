'use strict';

import onEnter from './add.indicator.controller';

export default angular.module('admin.indicators.add', [])
  .config($stateProvider => {
    $stateProvider.state('admin.indicators.add', {
        url: 'add/',
        onEnter
      });
  });