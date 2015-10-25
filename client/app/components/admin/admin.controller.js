'use strict';

export default class {
  constructor($scope) {
    'ngInject';
    $scope.myDate = new Date();
    // s$scope.toggleLeft = buildDelayedToggler('left');

    // function debounce(func, wait, context) {
    //   var timer;
    //   return function debounced() {
    //     var context = $scope,
    //         args = Array.prototype.slice.call(arguments);
    //     $timeout.cancel(timer);
    //     timer = $timeout(function() {
    //       timer = undefined;
    //       func.apply(context, args);
    //     }, wait || 10);
    //   };
    // }

    // function buildDelayedToggler(navID) {
    //   return debounce(function() {
    //     $mdSidenav(navID)
    //       .toggle()
    //       .then(function () {
    //         $log.debug("toggle " + navID + " is done");
    //       });
    //   }, 200);
    // }


      $scope.menu = [
        {
          link : '',
          title: 'Dashboard',
          icon: 'dashboard'
        },
        {
          link : '',
          title: 'Friends',
          icon: 'group'
        },
        {
          link : '',
          title: 'Messages',
          icon: 'message'
        }
      ];
      $scope.admin = [
        {
          link : '',
          title: 'Trash',
          icon: 'delete'
        },
        {
          link : 'showListBottomSheet($event)',
          title: 'Settings',
          icon: 'settings'
        }
      ];
  }
}
