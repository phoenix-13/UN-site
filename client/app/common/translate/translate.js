'use strict';

import translateComponent from './translate.component';

export default angular.module('translate', [])
  .directive('langTranslate', translateComponent);

