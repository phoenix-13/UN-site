'use strict';

//inject:import
import demographyModal from './demographyModal/demographyModal';
import galleryModal from './galleryModal/galleryModal';
import indicatorModal from './indicatorModal/indicatorModal';
import publicationModal from './publicationModal/publicationModal';
import slideModal from './slideModal/slideModal';
//endinject

export default angular.module('modals', [])
  //inject:ngservice

  .service('demographyModal', demographyModal)

  .service('galleryModal', galleryModal)

  .service('indicatorModal', indicatorModal)

  .service('publicationModal', publicationModal)

  .service('slideModal', slideModal)

  //endinject