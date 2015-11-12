'use strict';

export default class {
  constructor(ContentResource, Toast, content) {
    'ngInject';
    this.ContentResource = ContentResource;
    this.Toast = Toast;
    this.primaryArticles = content.featured;
  }

  updatePrimaryArticles() {
    this.ContentResource.updatePrimaryArticles({featured: this.primaryArticles})
      .then(() => this.Toast.show('Primary Articles Update!'))
  }
}
