'use strict';

import template from './gallery.html!text';
import './gallery.css!';

export default class {
  constructor($mdDialog, $q) {
    'ngInject';
    this.$mdDialog = $mdDialog;
    this.$q = $q;
  }

  showModal(images) {
    return this.$q((resolve, reject) => {
      this.$mdDialog.show({
        template,
        controller($scope) {
          $scope.images = images;
        }
      });
    });

  }
}
