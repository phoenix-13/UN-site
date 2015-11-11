'use strict';

import toastService from './toast.service';

export default angular.module('services', [])
  .service('Toast', toastService);
