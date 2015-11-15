'use strict';

export default Restangular => {
  'ngInject';

  return {
    searchAdminArticles: searchText => Restangular.one('search', 'admin').one('', searchText).get(),
    searchMainArticles: searchText => Restangular.one('search', 'main').one('', searchText).get(),
    searchArticles: searchQuery => Restangular.one('search', '').get(searchQuery)
  };
};