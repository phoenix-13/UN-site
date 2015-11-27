'use strict';

export default class {
  constructor($q, Toast, StorageResource, Upload, storage) {
    'ngInject';
    this.$q = $q;
    this.Toast = Toast;
    this.StorageResource = StorageResource;
    this.storage = storage;
    this.Upload = Upload;
    this.fileTypesMap = {xlsx: 'fa-file-excel-o', docx: 'fa-file-word-o', pdf: 'fa-file-pdf-o'};
  }

  getExtensionClass(fileName) {
    var extension = fileName.substring(fileName.lastIndexOf('.') + 1);
    return this.fileTypesMap[extension];
  }

  uploadFile(files) {
    if (files && files.length) {
      var promises = files.map(file => {
        return this.Upload
          .upload({
            url: 'api/files',
            data: {file}
          })
      });
      var toastText = (promises.length > 1)
        ? 'Files Added!'
        : 'File Added!';
      this.$q.all(promises)
        .then(arrayOfResponses => arrayOfResponses.forEach(response => this.storage.push(response.data)))
        .then(() => this.Toast.show(toastText));
    }
  }

  removeFile(file, index) {
    this.StorageResource.removeFile(file._id)
      .then(() => this.storage.splice(index, 1))
      .then(() => this.Toast.show('File removed!'));
  }
}