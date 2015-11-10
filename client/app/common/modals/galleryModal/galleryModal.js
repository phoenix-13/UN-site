'use strict';

import template from './galleryModal.html!text';
import './galleryModal.css!';

export default class {
  constructor($q, $mdDialog, Upload, Toast) {
    'ngInject';

    this.$q = $q;
    this.$mdDialog = $mdDialog;
    this.Upload = Upload;
    this.Toast = Toast;
  }

  open(images) {
    return this.$q((resolve, reject) => {
      var $q = this.$q;
      var $mdDialog = this.$mdDialog;
      var Upload = this.Upload;
      var Toast = this.Toast;

      this.$mdDialog.show({
        controller() {
          this.images = images;

          this.uploadImage = (files) => {
            if (files && files.length) {
              var promises = files.map(file => {
                return Upload
                  .upload({
                    url: 'api/images',
                    data: {file}
                  })
              });
              var toastText = (promises.length > 1)
                ? 'Images Added!'
                : 'Image Added!';
              $q.all(promises)
                .then(arrayOfResponses => arrayOfResponses.forEach(response => this.images.push(response.data)))
                .then(() => Toast.showToast(toastText));
            }
          };

          this.chooseImage = (image) => {
            resolve(image);
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

