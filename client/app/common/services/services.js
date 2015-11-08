'use strict';

import toastService from './toast.service';
import galleryService from './gallery/gallery.js';

export default angular.module('services', [])
  .service('Gallery', galleryService)
  .service('Toast', toastService);
