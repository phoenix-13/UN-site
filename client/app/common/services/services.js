'use strict';

import toastService from './toast.service';
import authService from './auth.service';

export default angular
  .module('services', [])
  .service('Auth', authService)
  .service('Toast', toastService);
