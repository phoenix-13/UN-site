'use strict';

//inject:import
import confirmModal from './confirmModal/confirmModal.js';
import demographyModal from './demographyModal/demographyModal.js';
import galleryModal from './galleryModal/galleryModal.js';
import indicatorModal from './indicatorModal/indicatorModal.js';
import partnerModal from './partnerModal/partnerModal.js';
import publicationModal from './publicationModal/publicationModal.js';
import slideModal from './slideModal/slideModal.js';
import storageModal from './storageModal/storageModal.js';
//endinject

export default angular.module('modals', [])
  //inject:ngservice

  .service('confirmModalModal', confirmModal)

  .service('demographyModalModal', demographyModal)

  .service('galleryModalModal', galleryModal)

  .service('indicatorModalModal', indicatorModal)

  .service('partnerModalModal', partnerModal)

  .service('publicationModalModal', publicationModal)

  .service('slideModalModal', slideModal)

  .service('storageModalModal', storageModal)

  //endinject