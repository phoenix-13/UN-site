'use strict';

export default ($mdIconProvider, $mdThemingProvider) => {
  'ngInject';
  $mdIconProvider.fontSet('fa', 'fontawesome');
  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey');
};