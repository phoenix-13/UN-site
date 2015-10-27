'use strict';

import template from './addIndicator.html!text';
import './addIndicator.css!';

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
