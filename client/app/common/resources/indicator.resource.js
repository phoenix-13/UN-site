'use strict';

export default Restangular => {
  'ngInject';

  return {
    getIndicators: () => Restangular.one('indicators').get(),
    addIndicator: data => Restangular.one('indicators', '').post('', data),
    updateIndicator: data => Restangular.one('contents', 'updateAbout').post('', data),
    removeIndicator: data => Restangular.one('contents', 'updateFeatured').post('', data)
  };
};