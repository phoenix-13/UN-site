'use strict';

export default class {
  constructor($state, $stateParams, Toast, IndicatorResource, indicatorModal, confirmModal, indicators, categories) {
    'ngInject';
    this.$state = $state;
    this.Toast = Toast;
    this.IndicatorResource = IndicatorResource;
    this.indicatorModal = indicatorModal;
    this.confirmModal = confirmModal;
    this.categories = categories;

    this.indicators = indicators.items;
    this.numTotal = indicators.numTotal;
    this.pageIndex = $stateParams.pageIndex;
    this.maxSize = 10;
  }

  loadPage() {
    this.$state.go('admin.indicators', {pageIndex: this.pageIndex});
  }

  openAddIndicatorModal(targetEvent) {
    this.indicatorModal.open(targetEvent, this.categories)
      .then(indicator => this.IndicatorResource.addIndicator({indicator}))
      .then(indicator => {
        this.Toast.show('Indicator Added Successfully!');
        this.$state.reload();
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
        this.Toast.show('Indicator Removed Successfully!');
        this.$state.reload();
      });
  }
}
