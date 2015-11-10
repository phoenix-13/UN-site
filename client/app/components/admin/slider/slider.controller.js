'use strict';

export default class {
  constructor(ContentResource, slideModal, content) {
    'ngInject';
    this.ContentResource = ContentResource;
    this.slideModal = slideModal;
    this.slider = content.slider;
  }

  openAddSlideModal() {
    this.slideModal.open()
      .then(slide => this.ContentResource.addSlide(slide))
      .then(slide => this.slider.push(slide));
  }

  openUpdateSlideModal(slider) {
    this.slideModal.open(slider)
      .then(() => console.log('succ'))
      .catch(() => console.log('error'));
  }

  openRemoveSlideModal(index) {
    console.log('remove confirmation: ' + index)
  }
}
