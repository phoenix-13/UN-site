'use strict';

import template from './demographyMap.html!text';
import controller from './demographyMap.controller';
import './demographyMap.css!';

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
      bgColor: '=',
      demographics: '=',
      onDemographySelected: '='
    },
    replace: true
  };
};
