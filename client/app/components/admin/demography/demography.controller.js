'use strict';

export default class {
  constructor($q, $state, demographyModal, DemographyResource, Toast, demographics) {
    'ngInject';
    this.$q = $q;
    this.$state = $state;
    this.demographyModal = demographyModal;
    this.DemographyResource = DemographyResource;
    this.Toast = Toast;
    this.demographics = {};
    demographics = _.sortBy(demographics, 'region.geo')
    this.indexDemographicsByRegion(demographics);
    this.indexDemographicsByYear();
    this.years = _.range(6).map((elem, i) => 2015 + i);
  }

  updateDemographics() {
    var promises = [];
    _.forIn(this.demographics, demography => {
      var yearValues = this.getValuesArray(demography.valuesMap);
      this.DemographyResource.updateDemography(demography._id, {yearValues});
    });
    this.$q
      .all(promises)
      .then(() => this.Toast.show('Demographics Updated Successfully!'))
      .then(() => this.$state.reload())
  }

  getValuesArray(valuesMap) {
    var array = [];
    _.forIn(valuesMap, (strValue, strYear) => {
      if (this.isInt(strValue) && this.isInt(strYear)) {
        var year = parseInt(strYear);
        var value = parseInt(strValue);
        array.push({value, year});
      }
    });
    return array;
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

  indexDemographicsByYear() {
    _.forIn(this.demographics, demography => {
      demography.valuesMap = {};
      demography.values.forEach(pair => {
        demography.valuesMap[pair.year] = pair.value;
      });
    });
  };

  isInt(value) {
    return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value));
  }
}
