'use strict';

import template from './footer.html!text';
import controller from './footer.controller';
import './footer.css!';

export default () => {
  return {
    restrict: 'E',
    template,
    controller,
    controllerAs: 'vm',
    scope: {},
    bindToController: {
      partners: '='
    },
    replace: true
  };
};
