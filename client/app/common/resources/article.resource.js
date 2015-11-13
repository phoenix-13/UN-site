'use strict';

export default Restangular => {
  'ngInject';

  return {
    searchAdminArticles: searchText => Restangular.one('search', 'admin').one('', searchText).get()
  };
};