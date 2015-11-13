'use strict';

export default $httpProvider => {
  'ngInject';
  $httpProvider.interceptors.push(authInterceptor);
};

function authInterceptor($injector) {
  'ngInject';

  return {
    request: config => {
      var Auth = $injector.get('Auth');
      var token = Auth.getToken();
      config.headers = config.headers || {};
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    },
  };
}