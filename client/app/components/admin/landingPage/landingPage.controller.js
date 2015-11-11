'use strict';

import addSlideTemplate from './addSlide.html!text';

export default class {
  constructor($scope, $state) {
    'ngInject';
    $scope.selectedIndex = 0;
    var states = ['admin.landingPage.primaryArticles', 'admin.landingPage.slider', 'admin.landingPage.banner'];
    $scope.$watch('selectedIndex', current => $state.go(states[current]));
  }
}
