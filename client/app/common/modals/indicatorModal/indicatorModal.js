'use strict';

import template from './indicatorModal.html!text';
import './indicatorModal.css!';

export default class {
  constructor($mdDialog) {
    'ngInject';
    this.$mdDialog = $mdDialog;
  }

  open(targetEvent, indicator) {

    return this.$mdDialog.show({
      controller() {
        this.indicator = indicator || {};
        this.title = (indicator) ? 'Update Indicator' : 'Add Indicator';

        this.save = () => {
          //TODO check if form is valid
          $mdDialog.hide(this.indicator);
        };

        this.cancel = () => $mdDialog.cancel();
      },
      controllerAs: 'vm',
      template,
      targetEvent,
      clickOutsideToClose: true
    });
  }
}
