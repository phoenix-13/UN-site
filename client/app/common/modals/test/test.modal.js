'use strict';

import template from './test.html!text';
import './test.css!';

export default class {
  constructor() {
    'ngInject';

  }

  open() {
    console.log('open');
  }
}
