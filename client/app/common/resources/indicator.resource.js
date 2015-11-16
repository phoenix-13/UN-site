'use strict';

export default Restangular => {
  'ngInject';

  return {
    getIndicator: indicatorId => Restangular.one('indicators', indicatorId).get(),
    addIndicator: data => Restangular.one('indicators', '').post('', data),
    getIndicatorsLimited: offset => Restangular.one('indicators', 'page').one('', offset).get(),
    updateIndicator: (indicatorId, data) => Restangular.one('indicators', indicatorId).post('', data),
    removeIndicator: indicatorId => Restangular.one('indicators', indicatorId).remove()
  };
};