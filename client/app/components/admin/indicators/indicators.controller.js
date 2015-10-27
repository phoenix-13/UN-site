'use strict';

export default class {
  constructor(test, $mdDialog) {
    'ngInject';

    this.test = test;
  }

  addIndicator() {
    this.test.open();
  }
}
