'use strict';

import template from './fusionMap.html!text';
import controller from './fusionMap.controller';
import './fusionMap.css!';

export default () => {
  return {
    restrict: 'E',
    template,
    controller,
    controllerAs: 'vm',
    scope: {},
    bindToController: {
      width: '=',
      height: '=',
      demographics: '='
    },
    replace: true
  };
};
