'use strict';

export default class {
  constructor($mdToast) {
    'ngInject';
    this.$mdToast = $mdToast;
  }

  showToast(content) {
    this.$mdToast.show(
      this.$mdToast.simple()
        .content(content)
        .position('top right')
        .hideDelay(1000)
    );
  }
}