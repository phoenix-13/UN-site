'use strict';

export default Restangular => {
  'ngInject';

  return {
    getImages: () => Restangular.one('images').get(),
    removeImage: (imageId) => Restangular.one('images', imageId).remove()
  };
};