'use strict';

export default class {
  constructor($mdSidenav) {
    'ngInject';
    this.$mdSidenav = $mdSidenav;
  }

  toggleNavbar() {
    this.$mdSidenav('left').toggle();
  }
}
