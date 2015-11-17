'use strict';

export default class {
  constructor(Toast, ContentResource, slideModal, confirmModal, content) {
    'ngInject';
    this.Toast = Toast;
    this.ContentResource = ContentResource;
    this.slideModal = slideModal;
    this.confirmModal = confirmModal;
    this.slider = content.slider;
    this.slider.forEach(slide => this.updateSliderReference(slide));
  }

  updateSliderReference(slide) {
    if (slide.ref._id) {
      slide.reference = slide.ref.title;
    } else {
      slide.reference = slide.link;
    }
  }

  openAddSlideModal(targetEvent) {
    this.slideModal.open(targetEvent)
      .then(slide => this.ContentResource.addSlide({slide}))
      .then(slide => {
        this.slider.push(slide);
        this.updateSliderReference(slide);
        this.Toast.show('Slide Added Successfully!');
      });
  }

  openUpdateSlideModal(targetEvent, slide) {
    var newSlide = angular.copy(slide);
    this.slideModal.open(targetEvent, newSlide)
      .then(updatedSlide => this.ContentResource.updateSlide(newSlide._id, {updateData: updatedSlide}))
      .then(() => {
        angular.copy(newSlide, slide);
        this.updateSliderReference(slide);
        this.Toast.show('Slide Updated Successfully!');
      });
  }

  openRemoveSlideModal(targetEvent, slide, index) {
    this.confirmModal.open(targetEvent)
      .then(() => this.ContentResource.removeSlide(slide._id))
      .then(() => {
        this.slider.splice(index, 1);
        this.Toast.show('Slide Removed Successfully!');
      });
  }
}
