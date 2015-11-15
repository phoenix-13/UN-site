'use strict';

export default class {
  constructor(demographics) {
    'ngInject';
    this.yearBounds = this.getDemographicsYearBounds(demographics);
    this.demographics = demographics;
    this.indexValuesByYears();
    this.years = _.range(this.yearsDelta()).map((elem, index) => this.yearBounds.minYear + index);
    this.selectedDemography = {
      region: {},
      lastValue: {
        region: {}
      }
    };
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

  getDemographicsYearBounds(demographics) {
    var minYear = 2020;
    var maxYear = 2009;
    for (var demography of demographics) {
      demography.values.forEach(pair => {
        if (pair.year > maxYear) {
          maxYear = pair.year;
        }
        if (pair.year < minYear) {
          minYear = pair.year;
        }
      })
    }
    return {minYear, maxYear};
  }

  indexValuesByYears() {
    this.demographics.forEach(demography => {
      demography.lastValue = demography.values[demography.values.length - 1];
      demography.lastValue.region = demography.region;
      demography.values = _.indexBy(demography.values, 'year');
    });
  }

  yearsDelta() {
    return this.yearBounds.maxYear - this.yearBounds.minYear + 1;
  }
}
