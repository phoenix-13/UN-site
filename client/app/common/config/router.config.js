'use strict';

export default ($urlRouterProvider, $locationProvider, $mdThemingProvider) => {
  'ngInject';
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');
  $urlRouterProvider.when('/', '/home');
  $urlRouterProvider.when('/admin', '/admin/landingPage');

  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey');
};
