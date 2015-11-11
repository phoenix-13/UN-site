'use strict';

import template from './slideModal.html!text';
import './slideModal.css!';

export default class {
  constructor($mdDialog) {
    'ngInject';
    this.$mdDialog = $mdDialog;
  }

  open(targetEvent, slide) {
    var defaultSlide = {title: {eng: '', geo: ''}};

    return this.$mdDialog.show({
      controller($mdDialog, galleryModal, Toast) {
        this.slide = slide || defaultSlide;
        this.title = (slide) ? 'Update Slide' : 'Add Slide';

        this.openGallery = () => {
          galleryModal.open()
            .then(image => this.slide.image = image.fileName);
        };

        this.save = () => {
          if (this.slide.image && this.slide.link) {
            $mdDialog.hide(this.slide);
          } else {
            Toast.show('Image And Link Should Be Provided!');
          }
        };

        this.cancel = () => $mdDialog.cancel();
      },
      controllerAs: 'vm',
      template,
      targetEvent,
      clickOutsideToClose: true
    });
  }
}
