'use strict';

export default Restangular => {
  'ngInject';

  return {
    getDemographics: () => Restangular.one('demographics').get(),
    updateDemography: (demographyId, data) => Restangular.one('demographics', demographyId).post('', data),
  };
};