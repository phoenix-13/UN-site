'use strict';

import template from './publicationModal.html!text';
import './publicationModal.css!';

export default class {
  constructor($q, $mdDialog) {
    'ngInject';

    this.$q = $q;
    this.$mdDialog = $mdDialog;
  }

  open() {
    return this.$q((resolve, reject) => {
      this.$mdDialog.show({
        controller() {
        },
        controllerAs: 'vm',
        template,
        parent: angular.element(document.body),
        clickOutsideToClose: true
      })
      .then(() => {
        reject();
      }, () => {
        reject();
      });
    });
  }
}
