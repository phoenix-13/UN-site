'use strict';

import template from './slideModal.html!text';
import './slideModal.css!';

export default class {
  constructor($q, $mdDialog) {
    'ngInject';

    this.$q = $q;
    this.$mdDialog = $mdDialog;
  }

  open(slide) {
    return this.$q((resolve, reject) => {
      this.$mdDialog.show({
        controller() {
          this.slide = slide || {};
          this.title = (slide) ? 'Update Slide' : 'Add Slide';

          this.save = () => {
            resolve(this.slide);
            $mdDialog.hide();
          };

          this.cancel = () => {
            reject();
            $mdDialog.hide();
          };
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
