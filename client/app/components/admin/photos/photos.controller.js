'use strict';

export default class {
  constructor($q, Toast, ImageResource, Upload, images) {
    'ngInject';
    this.$q = $q;
    this.Toast = Toast;
    this.ImageResource = ImageResource;
    this.images = images;
    this.Upload = Upload;
  }

  uploadImages(files) {
    if (files && files.length) {
      var promises = files.map(file => {
        return this.Upload
          .upload({
            url: 'api/images',
            data: {file}
          })
      });
      var toastText = (promises.length > 1)
        ? 'Images Added!'
        : 'Image Added!';
      this.$q.all(promises)
        .then(arrayOfResponses => arrayOfResponses.forEach(response => this.images.push(response.data)))
        .then(() => this.Toast.showToast(toastText));
    }
  }

  removeImage(image, index) {
    this.ImageResource.removeImage(image._id)
      .then(() => this.images.splice(index, 1))
      .then(() => this.Toast.showToast('Image removed!'));
  }
}
