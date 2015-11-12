'use strict';

export default Restangular => {
  'ngInject';

  return {
    getIndicators: () => Restangular.one('indicators').get(),
    addIndicator: data => Restangular.one('indicators', '').post('', data),
    updateIndicator: (indicatorId, data) => Restangular.one('indicators', indicatorId).post('', data),
    removeIndicator: indicatorId => Restangular.one('indicators', indicatorId).remove()
  };
};