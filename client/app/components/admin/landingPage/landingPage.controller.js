'use strict';

import addSlideTemplate from './addSlide.html!text';

export default class {
  constructor($mdDialog, Gallery, Toast, ContentResource, content, images) {
    'ngInject';
    this.$mdDialog = $mdDialog;
    this.Gallery = Gallery;
    this.Toast = Toast;
    this.$mdDialog = $mdDialog;
    this.ContentResource = ContentResource;
    this.primaryArticles = content.featured;
    this.banner = content.banner;
    this.images = images;
  }

  updatePrimaryArticles() {
    this.ContentResource.updatePrimaryArticles({featured: this.primaryArticles})
      .then(() => this.Toast.showToast('Primary Articles Update!'))
  }

  openGallery() {
    this.Gallery.showModal(this.images);
  }

  openAddSlideModal() {
    this.$mdDialog.show({
      template: addSlideTemplate,
      escapeToClose: true,
      clickOutsideToClose: true,
      controller($scope) {
        console.log('scope');
      }
    });
  }

  updateBanner() {
    console.log('updateBanner');
  }
}
