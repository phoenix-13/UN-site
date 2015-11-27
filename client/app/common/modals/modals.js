'use strict';

//inject:import
import confirmModal from './confirmModal/confirmModal';
import demographyModal from './demographyModal/demographyModal';
import galleryModal from './galleryModal/galleryModal';
import indicatorModal from './indicatorModal/indicatorModal';
import partnerModal from './partnerModal/partnerModal';
import publicationModal from './publicationModal/publicationModal';
import slideModal from './slideModal/slideModal';
import storageModal from './storageModal/storageModal';
//endinject

export default angular.module('modals', [])
  //inject:ngservice

  .service('confirmModal', confirmModal)

  .service('demographyModal', demographyModal)

  .service('galleryModal', galleryModal)

  .service('indicatorModal', indicatorModal)

  .service('partnerModal', partnerModal)

  .service('publicationModal', publicationModal)

  .service('slideModal', slideModal)

  .service('storageModal', storageModal)

  //endinject