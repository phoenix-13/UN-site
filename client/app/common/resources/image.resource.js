'use strict';

export default Restangular => {
  'ngInject';

  return {
    getImages: () => Restangular.one('images').get()
  };
};