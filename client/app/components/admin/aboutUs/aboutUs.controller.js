'use strict';

export default class {
  constructor(ContentResource, Toast, content) {
    'ngInject';
    this.ContentResource = ContentResource;
    this.Toast = Toast;
    this.about = content.about;
  }

  updateAbout() {
    this.ContentResource.updateAbout({about: this.about})
      .then(() => this.Toast.showToast('Updated Successfully!'));
  }
}
