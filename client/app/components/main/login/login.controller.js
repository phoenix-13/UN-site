'use strict';

export default class {
  constructor($state, Auth) {
    'ngInject';
    this.$state = $state;
    this.Auth = Auth;
    this.admin = {name: 'name', password: 'password'};
  }

  login() {
    this.Auth
      .login(this.admin)
      .then(() => this.$state.go('admin.landingPage'))
      .catch(() => this.showError = true);
  }
}
