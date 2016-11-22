'use strict';

export default class {
  constructor($cookies, AdminResource) {
    'ngInject';
    this.$cookies = $cookies;
    this.AdminResource = AdminResource;
  }

  login(admin) {
    return this.AdminResource.login(admin)
      .then(res => this.$cookies.put('token', res.token));
  }

  logout() {
    this.$cookies.remove('token');
  }

  getToken() {
    return this.$cookies.get('token');
  }
}
