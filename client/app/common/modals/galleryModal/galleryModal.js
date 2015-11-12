'use strict';

import template from './galleryModal.html!text';
import './galleryModal.css!';

export default class {
  constructor($uibModal, ImageResource) {
    'ngInject';
    this.$uibModal = $uibModal;
    this.ImageResource = ImageResource;
  }

  open() {
    var modalInstance = this.$uibModal.open({
      resolve: {images: this.ImageResource.getImages()},
      controller($q, $uibModalInstance, Upload, Toast, images) {
        this.images = images;

        this.uploadImage = files => {
          if (files && files.length) {
            var promises = files.map(file => {
              return Upload
                .upload({
                  url: 'api/images',
                  data: {file}
                })
            });
            var toastText = (promises.length > 1)
              ? 'Images Added!'
              : 'Image Added!';
            $q.all(promises)
              .then(arrayOfResponses => arrayOfResponses.forEach(response => this.images.push(response.data)))
              .then(() => Toast.show(toastText));
          }
        };

        this.chooseImage = image => $uibModalInstance.close(image);

        this.cancel = () => $uibModalInstance.dismiss('cancel');
      },
      controllerAs: 'vm',
      template,
      size: 'lg'
    });

    return modalInstance.result;
  }
}

