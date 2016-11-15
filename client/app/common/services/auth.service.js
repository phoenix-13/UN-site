'use strict';

export default class {
  constructor($cookieStore, AdminResource) {
    'ngInject';
    this.$cookieStore = $cookieStore;
    this.AdminResource = AdminResource;
  }

  login(admin) {
    return this.AdminResource.login(admin)
      .then(res => this.$cookieStore.put('token', res.token));
  }

  logout() {
    this.$cookieStore.remove('token');
  }

  getToken() {
    return this.$cookieStore.get('token');
  }
}
