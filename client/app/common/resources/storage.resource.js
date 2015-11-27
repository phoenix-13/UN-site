'use strict';

export default Restangular => {
  'ngInject';

  return {
    getFiles: () => Restangular.one('files').get(),
    removeFile: fileId => Restangular.one('files', fileId).remove()
  };
};