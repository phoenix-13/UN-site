'use strict';

export default class {
  constructor($state, demographyModal, DemographyResource, Toast, demographics) {
    'ngInject';
    this.$state = $state;
    this.demographyModal = demographyModal;
    this.DemographyResource = DemographyResource;
    this.Toast = Toast;
    this.demographics = {};
    this.indexDemographicsByRegion(demographics);
    this.indexDemographicsByYear();
    this.years = _.range(12).map((elem, i) => 2009 + i);
  }

  openUpdateDemographyModal(targetEvent, regionName) {
    var region = this.demographics[regionName];
    this.demographyModal
      .open(targetEvent, region)
      .then(yearValues => this.DemographyResource.updateDemography(region._id, {yearValues}))
      .then(() => this.Toast.show('Demography Updated Successfully!'))
      .then(() => this.$state.reload());
  }

  showDemographyInfo(event, demographyRegionName) {
    if (this.selectedDemography.region.geo !== demographyRegionName) {
      $('#selectedDemography').removeClass('hidden');
      this.selectedDemography = this.demographics.filter(demography => demography.region.geo === demographyRegionName)[0];
      $('#selectedDemography').css({"top": event.pageY + 20, "left": event.pageX - 50});
    }
  }

  hideDemographyInfo(demographyRegionName) {
    if (this.selectedDemography.region.geo !== demographyRegionName) {
      $('#selectedDemography').addClass('hidden');
    }
  }

  indexDemographicsByRegion(demographics) {
    demographics.forEach(demography => this.demographics[demography.region.geo] = demography);
  }

  indexDemographicsByYear = () => {
    _.forIn(this.demographics, (value, key) => {
      value.valuesMap = _.indexBy(value.values, 'year');
    });
  }
}
