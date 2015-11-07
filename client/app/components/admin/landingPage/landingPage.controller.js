'use strict';

export default class {
  constructor(Toast, ContentResource, content) {
    'ngInject';
    this.Toast = Toast;
    this.ContentResource = ContentResource;
    this.primaryArticles = content.featured;
  }

  updatePrimaryArticles() {
    this.ContentResource.updatePrimaryArticles({featured: this.primaryArticles})
      .then(() => this.Toast.showToast('Primary Articles Update!'))
  }
}
