'use strict';

export default class {
  constructor(ContentResource, galleryModal, Toast, images, content) {
    'ngInject';
    this.ContentResource = ContentResource;
    this.galleryModal = galleryModal;
    this.Toast = Toast;
    this.images = images;
    this.banner = content.banner;
  }

  openGallery() {
    this.galleryModal
      .open(this.images)
      .then(image => this.banner.image = image.fileName);
  }

  updateBanner() {
    this.ContentResource
      .updateBanner({banner: this.banner})
      .then(() => this.Toast.showToast('Banner Updated Successfully!'));
  }
}
