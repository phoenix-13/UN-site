'use strict';

import template from './translate.html!text';
import controller from './translate.controller';
import './translate.css!';

export default () => {
  return {
    restrict: 'E',
    template,
    controller,
    controllerAs: 'vm',
    scope: {},
    bindToController: {},
    replace: true,
  };
};

