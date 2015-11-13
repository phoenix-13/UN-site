'use strict';

export default Restangular => {
  'ngInject';

  return {
    getIndicatorsLimited: offset => Restangular.one('indicators', 'page').one('', offset).get(),
    addIndicator: data => Restangular.one('indicators', '').post('', data),
    updateIndicator: (indicatorId, data) => Restangular.one('indicators', indicatorId).post('', data),
    removeIndicator: indicatorId => Restangular.one('indicators', indicatorId).remove()
  };
};