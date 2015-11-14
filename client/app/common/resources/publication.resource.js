'use strict';

export default Restangular => {
  'ngInject';

  return {
    getPublicationsLimited: offset => Restangular.one('publications', 'page').one('', offset).get(),
    getLatestPublications: () => Restangular.one('publications', 'latest').get(),
    addPublication: data => Restangular.one('publications', '').post('', data),
    updatePublication: (publicationId, data) => Restangular.one('publications', publicationId).post('', data),
    removePublication: publicationId => Restangular.one('publications', publicationId).remove()
  };
};