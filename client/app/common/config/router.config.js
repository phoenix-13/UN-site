'use strict';

export default ($urlRouterProvider, $locationProvider) => {
  'ngInject';
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');
  $urlRouterProvider.when('/', '/home');
  $urlRouterProvider.when('/admin', '/admin/landingPage');
};
