'use strict';

export default class {
  constructor(Toast, IndicatorResource, indicatorModal, confirmModal, indicators, categories) {
    'ngInject';
    this.Toast = Toast;
    this.IndicatorResource = IndicatorResource;
    this.indicatorModal = indicatorModal;
    this.confirmModal = confirmModal;
    this.indicators = indicators;
    this.categories = categories;
  }

  openAddIndicatorModal(targetEvent) {
    this.indicatorModal.open(targetEvent, this.categories)
      .then(indicator => this.IndicatorResource.addIndicator({indicator}))
      .then(indicator => {
        this.indicators.push(indicator)
        this.Toast.show('Indicator Added Successfully!');
      });
  }

  openUpdateIndicatorModal(targetEvent, indicator) {
    var newIndicator = angular.copy(indicator);
    newIndicator.date = new Date(newIndicator.date);
    this.indicatorModal.open(targetEvent, this.categories, newIndicator)
      .then(updatedIndicator => this.IndicatorResource.updateIndicator(newIndicator._id, {data: updatedIndicator}))
      .then(() => {
        angular.copy(newIndicator, indicator);
        this.Toast.show('Indicator Updated Successfully!');
      });
  }

  openRemoveIndicatorModal(targetEvent, indicator, index) {
    this.confirmModal.open(targetEvent)
      .then(() => this.IndicatorResource.removeIndicator(indicator._id))
      .then(() => {
        this.indicators.splice(index, 1);
        this.Toast.show('Indicator Removed Successfully!');
      });
  }
}
