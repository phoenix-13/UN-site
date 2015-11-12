'use strict';

export default class {
  constructor($state, demographyModal, DemographyResource, Toast, demographics) {
    'ngInject';
    this.$state = $state;
    this.demographyModal = demographyModal;
    this.DemographyResource = DemographyResource;
    this.Toast = Toast;
    this.demographics = {};
    demographics.forEach(demography => this.demographics[demography.region.geo] = demography);
  }

  openUpdateDemographyModal(targetEvent, regionName) {
    var region = this.demographics[regionName];
    this.demographyModal
      .open(targetEvent, region)
      .then(yearValues => this.DemographyResource.updateDemography(region._id, {yearValues}))
      .then(() => this.Toast.show('Demography Updated Successfully!'))
      .then(() => this.$state.reload());
  }
}
