'use strict';

export default ($urlRouterProvider, $locationProvider, $mdThemingProvider) => {
  'ngInject';
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/home');
  $urlRouterProvider.when('', '/home');
  $urlRouterProvider.when('/', '/home');
  $urlRouterProvider.when('/admin', '/admin/landingPage');
  $urlRouterProvider.when('/admin/', '/admin/landingPage');
};
