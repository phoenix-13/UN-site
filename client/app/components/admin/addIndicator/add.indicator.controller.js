'use strict';

import template from './add.indicator.html!text';
import './add.indicator.css!';

export default ($state, $mdDialog) => {
  'ngInject';
  $mdDialog.show({
    template,
    clickOutsideToClose: true,
    controller() {},
    controllerAs: 'vm'
  })
  .finally(() => $state.go('^'));
};