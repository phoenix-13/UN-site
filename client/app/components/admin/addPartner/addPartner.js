'use strict';

import controller from './addPartnerController.js';
import template from './addPartner.html!text';
import './addPartner.css!';

export default angular.module('admin.partners.add', [])
  .config(($stateProvider) => {
    $stateProvider
      .state('admin.partners.add', {
        url: '/add',
        onEnter: $mdDialog => {
          $mdDialog.show({
            template,
            controller,
            controllerAs: 'vm',
            escapeToClose: false
          });
        }
      });
  });