'use strict';

import template from './partnerModal.html!text';
import './partnerModal.css!';

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
            Toast.showToast('Image And Link Should Be Provided!');
          }
        };

        this.cancel = () => $mdDialog.cancel();
      },
      controllerAs: 'vm',
      template,
      parent: angular.element(document.body),
      targetEvent: targetEvent,
      clickOutsideToClose: true
    });
  }
}
