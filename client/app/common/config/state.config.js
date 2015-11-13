'use strict';

export default ($rootScope, $state, $mdDialog) => {
  'ngInject';

  $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
    switch (error) {
      case 'unauthorizedAdmin':
        $state.go('main.login');
        break;
      default:
        $state.go('main.home');
        break;
    }
  });

  $rootScope.$on('$stateChangeStart', () => $mdDialog.cancel());
};