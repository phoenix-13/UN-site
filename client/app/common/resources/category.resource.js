'use strict';

export default Restangular => {
  'ngInject';

  return {
    getCategories: () => Restangular.one('categories').get()
  };
};