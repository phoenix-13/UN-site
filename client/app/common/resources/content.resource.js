'use strict';

export default Restangular => {
  'ngInject';

  return {
    getContent: () => Restangular.one('contents').get(),
    updateContact: data => Restangular.one('contents', 'updateContacts').post('', data),
    updateAbout: data => Restangular.one('contents', 'updateAbout').post('', data),
    updatePrimaryArticles: data => Restangular.one('contents', 'updateFeatured').post('', data),
    updateBanner: data => Restangular.one('contents', 'updateBanner').post('', data),
    addSlide: data => Restangular.one('contents', 'addSlide').post('', data),
    updateSlide: (slideId, data) => Restangular.one('contents', 'updateSlide').post(slideId, data),
    removeSlide: slideId => Restangular.one('contents', 'removeSlide').post(slideId),
    addPartner: data => Restangular.one('contents', 'addPartner').post('', data),
    updatePartner: (partnerId, data) => Restangular.one('contents', 'updatePartner').post(partnerId, data),
    removePartner: partnerId => Restangular.one('contents', 'removePartner').post(partnerId),
  };
};