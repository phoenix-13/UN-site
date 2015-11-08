'use strict';

export default class {
  constructor(Gallery, Toast, ContentResource, content) {
    'ngInject';
    this.Gallery = Gallery;
    this.Toast = Toast;
    this.ContentResource = ContentResource;
    this.primaryArticles = content.featured;
    this.images = content.images;
  }

  updatePrimaryArticles() {
    this.ContentResource.updatePrimaryArticles({featured: this.primaryArticles})
      .then(() => this.Toast.showToast('Primary Articles Update!'))
  }

  openGallery() {
    this.Gallery.showModal(this.images);
  }
}
