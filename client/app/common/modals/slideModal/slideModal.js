'use strict';

import template from './slideModal.html!text';
import './slideModal.css!';

export default class {
  constructor($q, $mdDialog, galleryModal) {
    'ngInject';

    this.$q = $q;
    this.$mdDialog = $mdDialog;
    this.galleryModal = galleryModal;
  }

  open(slide) {
    return this.$q((resolve, reject) => {
      var $mdDialog = this.$mdDialog;
      var galleryModal = this.galleryModal;
      var defaultSlide = {
        title: {eng: '', geo: ''},
        link: '',
      };

      this.$mdDialog.show({
        controller() {
          this.slide = slide || defaultSlide;
          this.title = (slide) ? 'Update Slide' : 'Add Slide';

          this.openGallery = () => {
            galleryModal.open()
              .then(image => this.slide.image = image.fileName);
          };

          this.save = () => {
            resolve(this.slide);
            $mdDialog.cancel();
          };

          this.cancel = () => {
            reject();
            $mdDialog.cancel();
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
