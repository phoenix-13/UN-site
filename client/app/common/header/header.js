'use strict';

import headerComponent from './header.component';

export default angular.module('header', [])
  .directive('unHeader', headerComponent);
