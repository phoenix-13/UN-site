'use strict';

export default class {
  constructor($state, $mdSidenav, Auth) {
    'ngInject';
    this.$state = $state;
    this.$mdSidenav = $mdSidenav;
    this.Auth = Auth;
  }

  toggleNavbar = () => this.$mdSidenav('left').toggle();

  logout = () => {
    this.$state.go('main.login');
    this.Auth.logout();
  }
}
