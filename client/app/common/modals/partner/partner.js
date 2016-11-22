'use strict';

import template from './partner.html!text';
import './partner.css!';

export default class {
  constructor($mdDialog) {
    'ngInject';
    this.$mdDialog = $mdDialog;
  }

  open(targetEvent, partner) {
    var defaultPartner = {name: {eng: '', geo: ''}};

    return this.$mdDialog.show({
      controller($mdDialog, galleryModal, Toast) {
        this.partner = partner || defaultPartner;
        this.title = (partner) ? 'Update Partner' : 'Add Partner';

        this.openGallery = () => {
          galleryModal.open()
            .then(image => this.partner.image = image.fileName);
        }

        this.save = () => {
          if (this.partner.image && this.partner.link) {
            $mdDialog.hide(this.partner);
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
