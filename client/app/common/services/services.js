'use strict';

import toastService from './toast.service';
import authService from './auth.service';
import emailService from './email.service';
import LangService from './lang.service';

export default angular
  .module('services', [])
  .service('LangService', LangService)
  .service('Auth', authService)
  .service('Toast', toastService)
  .service('emailService', emailService);
