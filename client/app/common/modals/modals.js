'use strict';

//inject:import
import confirm from './confirm/confirm.js';
import demography from './demography/demography.js';
import gallery from './gallery/gallery.js';
import indicator from './indicator/indicator.js';
import partner from './partner/partner.js';
import publication from './publication/publication.js';
import slide from './slide/slide.js';
import storage from './storage/storage.js';
//endinject

export default angular.module('modals', [])
  //inject:ngservice

  .service('confirmModal', confirm)

  .service('demographyModal', demography)

  .service('galleryModal', gallery)

  .service('indicatorModal', indicator)

  .service('partnerModal', partner)

  .service('publicationModal', publication)

  .service('slideModal', slide)

  .service('storageModal', storage)

  //endinject