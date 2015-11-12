'use strict';

export default Restangular => {
  'ngInject';

  return {
    getPublications: () => Restangular.one('publications').get(),
    addPublication: data => Restangular.one('publications', '').post('', data),
    updatePublication: (publicationId, data) => Restangular.one('publications', publicationId).post('', data),
    removePublication: publicationId => Restangular.one('publications', publicationId).remove()
  };
};