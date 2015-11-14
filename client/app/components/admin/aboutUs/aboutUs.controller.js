'use strict';

export default class {
  constructor($timeout, ContentResource, Toast, content, textAngularManager) {
    'ngInject';
    this.ContentResource = ContentResource;
    this.Toast = Toast;
    this.about = content.about;

    $timeout(() => {
      var aboutUsGeoEditor = textAngularManager.retrieveEditor('about-geo-editor');
      aboutUsGeoEditor.scope.displayElements.text[0].focus();
      var aboutUsEngEditor = textAngularManager.retrieveEditor('about-eng-editor');
      aboutUsEngEditor.scope.displayElements.text[0].focus();
    });
  }

  updateAbout() {
    this.ContentResource.updateAbout({about: this.about})
      .then(() => this.Toast.show('Updated Successfully!'));
  }
}
