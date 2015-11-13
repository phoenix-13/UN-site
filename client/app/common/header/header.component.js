'use strict';

import template from './header.html!text';
import controller from './header.controller';
import './header.css!';

export default () => {
  return {
    restrict: 'E',
    template,
    controller,
    controllerAs: 'vm',
    scope: {},
    bindToController: {},
    replace: true
  };
};
