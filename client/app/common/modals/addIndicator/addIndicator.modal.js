'use strict';

import template from './addIndicator.html!text';
import './addIndicator.css!';

export default class {
  constructor($mdDialog) {
    'ngInject';

  }
  open() {
    console.log("I am here")
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'dialog1.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  }
}
