'use strict';

export default class {
  constructor($state, $mdDialog) {
    'ngInject';
    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.indicator = {};
  }

  addIndicator() {
    console.log(this.indicator);
  }

  close() {
    this.$mdDialog.cancel();
    this.$state.go('^');
  }
}