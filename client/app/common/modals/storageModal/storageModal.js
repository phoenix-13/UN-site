'use strict';

import template from './storageModal.html!text';
import './storageModal.css!';

export default class {
  constructor($uibModal, StorageResource) {
    'ngInject';
    this.$uibModal = $uibModal;
    this.StorageResource = StorageResource;
  }

  open() {
    var modalInstance = this.$uibModal.open({
      resolve: {
        storage: this.StorageResource.getFiles()
      },
      controller($q, $uibModalInstance, Upload, Toast, storage) {
        this.storage = storage;

        this.uploadFile = files => {
          if (files && files.length) {
            var promises = files.map(file => {
              return Upload
                .upload({
                  url: 'api/files',
                  data: {file}
                })
            });
            var toastText = (promises.length > 1)
              ? 'Files Added!'
              : 'File Added!';
            $q.all(promises)
              .then(arrayOfResponses => arrayOfResponses.forEach(response => this.storage.push(response.data)))
              .then(() => Toast.show(toastText));
          }
        };

        this.chooseFile = file => $uibModalInstance.close(file);

        this.cancel = () => $uibModalInstance.dismiss('cancel');
      },
      controllerAs: 'vm',
      template,
      size: 'lg'
    });

    return modalInstance.result;
  }
}

