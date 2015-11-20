'use strict';

export default class {
  constructor(demographics) {
    'ngInject';
    this.yearBounds = this.getDemographicsYearBounds(demographics);
    this.demographics = demographics;
    this.indexValuesByYears();
    this.years = _.range(this.yearsDelta()).map((elem, index) => this.yearBounds.minYear + index);
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
