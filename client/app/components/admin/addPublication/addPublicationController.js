'use strict';

export default class {
  constructor($state, $mdDialog) {
    'ngInject';
    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.partner = {};
  }

  addPublication() {
    console.log(this.partner);
  }

  close() {
    this.$mdDialog.hide();
    this.$state.go('^');
  }
}