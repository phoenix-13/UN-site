'use strict';

export default class {
  constructor($state, $stateParams, Toast, PublicationResource, publicationModal, confirmModal, categories, publications) {
    'ngInject';
    this.$state = $state;
    this.Toast = Toast;
    this.PublicationResource = PublicationResource;
    this.publicationModal = publicationModal;
    this.confirmModal = confirmModal;
    this.categories = categories;

    this.publications = publications.items;
    this.numTotal = publications.numTotal;
    this.pageIndex = $stateParams.pageIndex;
    this.maxSize = 10;
  }

  loadPage() {
    this.$state.go('admin.publications', {pageIndex: this.pageIndex});
  }

  openAddPublicationModal(targetEvent) {
    this.publicationModal.open(targetEvent, this.categories)
      .then(publication => this.PublicationResource.addPublication({publication}))
      .then(() => {
        this.Toast.show('Publication Added Successfully!');
        this.$state.reload();
      });
  }

  openUpdatePublicationModal(targetEvent, publication) {
    var newPublication = angular.copy(publication);
    newPublication.date = new Date(newPublication.date);
    this.publicationModal.open(targetEvent, this.categories, newPublication)
      .then(updatedPublication => this.PublicationResource.updatePublication(newPublication._id, {data: updatedPublication}))
      .then(() => {
        angular.copy(newPublication, publication);
        this.Toast.show('Publication Updated Successfully!');
      });
  }

  openRemovePublicationModal(targetEvent, publication, index) {
    this.confirmModal.open(targetEvent)
      .then(() => this.PublicationResource.removePublication(publication._id))
      .then(() => {
        this.Toast.show('Publication Removed Successfully!');
        this.$state.reload();
      });
  }
}
