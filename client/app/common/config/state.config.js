'use strict';

export default ($rootScope, $state, $mdDialog) => {
  'ngInject';

  $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
    switch (error) {
      case 'unauthorizedAdmin':
        $state.go('main.loginAdmin');
        break;
      default:
        $state.go('main');
        break;
    }
  });

  $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams, error) => {
    $mdDialog.hide();
  });
}