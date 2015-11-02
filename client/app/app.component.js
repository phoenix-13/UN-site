'use strict';

import template from './app.html!text';
import './app.css!';

export default () => {
  return {
    restrict: 'E',
    template,
    replace: true
  };
};
