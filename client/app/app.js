'use strict';

import Dependencies from './app.dependencies';
import Common from './common/common';
import Components from './components/components';
import appComponent from './app.component';

let appModule = angular.module('app', [
  Dependencies.name,
  Common.name,
  Components.name,
])
.directive('app', appComponent);

angular.element(document).ready(() => {
  angular.bootstrap(document, [appModule.name]), {
    strictDi: true
  };
});

export default appModule;
