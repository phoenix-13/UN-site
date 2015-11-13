'use strict';

export default Restangular => {
  'ngInject';

  return {
    login: data => Restangular.one('admins').post('authenticate', data),
    getAdmin: () => Restangular.one('admins').one('me').get()
  };
};