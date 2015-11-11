'use strict';

export default class {
  constructor(Toast, ContentResource, partnerModal, confirmModal, content) {
    'ngInject';
    this.Toast = Toast;
    this.ContentResource = ContentResource;
    this.partnerModal = partnerModal;
    this.confirmModal = confirmModal;
    this.partners = content.partners;
  }

  openAddPartnerModal(targetEvent) {
    this.partnerModal.open(targetEvent)
      .then(partner => this.ContentResource.addPartner({partner}))
      .then(partner => {
        this.partners.push(partner);
        this.Toast.showToast('Partner Added Successfully!');
      });
  }

  openUpdatePartnerModal(targetEvent, partner) {
    var newPartner = angular.copy(partner);
    this.partnerModal.open(targetEvent, newPartner)
      .then(updatedPartner => this.ContentResource.updatePartner(newPartner._id, {updateData: updatedPartner}))
      .then(() => {
        angular.copy(newPartner, partner);
        this.Toast.showToast('Partner Updated Successfully!');
      });
  }

  openRemovePartnerModal(targetEvent, partner, index) {
    this.confirmModal.open(targetEvent)
      .then(() => this.ContentResource.removePartner(partner._id))
      .then(() => {
        this.partners.splice(index, 1);
        this.Toast.showToast('Partner Removed Successfully!');
      });
  }
}
