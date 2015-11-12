'use strict';

export default class {
  constructor(Toast, PublicationResource, publicationModal, confirmModal, publications, categories) {
    'ngInject';
    this.Toast = Toast;
    this.PublicationResource = PublicationResource;
    this.publicationModal = publicationModal;
    this.confirmModal = confirmModal;
    this.publications = publications;
    this.categories = categories;
  }

  openAddPublicationModal(targetEvent) {
    this.publicationModal.open(targetEvent, this.categories)
      .then(publication => this.PublicationResource.addPublication({publication}))
      .then(publication => {
        this.publications.push(publication);
        this.Toast.show('Publication Added Successfully!');
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
        this.publications.splice(index, 1);
        this.Toast.show('Publication Removed Successfully!');
      });
  }
}
