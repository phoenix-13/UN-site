'use strict';

export default ($rootScope, $state, $mdDialog) => {
  'ngInject';
  $rootScope.$on('$stateChangeStart', () => $mdDialog.hide());
}