'use strict';

export default class {
  constructor($state, $mdDialog) {
    'ngInject';
    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.publication = {};
  }

  editPublication() {
    console.log(this.publication);
  }

  close() {
    this.$mdDialog.cancel();
    this.$state.go('^');
  }
}