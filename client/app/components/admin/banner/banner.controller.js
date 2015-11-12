'use strict';

export default class {
  constructor(ContentResource, galleryModal, Toast, content) {
    'ngInject';
    this.ContentResource = ContentResource;
    this.galleryModal = galleryModal;
    this.Toast = Toast;
    this.banner = content.banner;
  }

  openGallery() {
    this.galleryModal.open()
      .then(image => this.banner.image = image.fileName);
  }

  updateBanner() {
    this.ContentResource
      .updateBanner({banner: this.banner})
      .then(() => this.Toast.show('Banner Updated Successfully!'));
  }
}
