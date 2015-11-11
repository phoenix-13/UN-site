'use strict';

export default class {
  constructor(Toast, ContentResource, slideModal, confirmModal, content) {
    'ngInject';
    this.Toast = Toast;
    this.ContentResource = ContentResource;
    this.slideModal = slideModal;
    this.confirmModal = confirmModal;
    this.slider = content.slider;
  }

  openAddSlideModal() {
    this.slideModal.open()
      .then(slide => this.ContentResource.addSlide({slide}))
      .then(slide => {
        this.slider.push(slide)
        this.Toast.showToast('Slide Added Successfully!');
      });
  }

  openUpdateSlideModal(slide) {
    var newSlide = angular.copy(slide);
    this.slideModal.open(newSlide)
      .then(updatedSlide => this.ContentResource.updateSlide(newSlide._id, {updateData: updatedSlide}))
      .then(() => {
        angular.copy(newSlide, slide)
        this.Toast.showToast('Slide Updated Successfully!');
      });
  }

  openRemoveSlideModal(slide, index) {
    this.confirmModal.open()
      .then(() => this.ContentResource.removeSlide(slide._id))
      .then(() => {
        this.slider.splice(index, 1);
        this.Toast.showToast('Slide Removed Successfully!');
      });
  }
}
