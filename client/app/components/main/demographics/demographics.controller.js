'use strict';

export default class {
  constructor(demographics) {
    'ngInject';
    this.yearBounds = this.getDemographicsYearBounds(demographics);
    this.demographics = demographics;
    this.indexValuesByYears();
    this.years = _.range(this.yearsDelta()).map((elem, index) => this.yearBounds.minYear + index);
    this.data = this.getRangedDemographyMapData();
    //this.selectedDemography = {
    //  region: {},
    //  lastValue: {
    //    region: {}
    //  }
    //};
  }

  getRangedDemographyMapData() {
    var chart = {
      "baseFont": "BPG Nino Mtavruli",
      "baseFontSize": '16',
      "useHoverColor": "0",
      'theme': 'fint',
      'formatNumberScale': '0'
    };
    var colorrange = {
      'color': [{
        'minvalue': '0',
        'maxvalue': '10000',
        'code': '#bfcbff',
        'displayValue': '< 10000'
      }, {
        'minvalue': '10000',
        'maxvalue': '25000',
        'code': '#94a9ff',
        'displayValue': '10000 - 25000'
      }, {
        'minvalue': '25000',
        'maxvalue': '50000',
        'code': '#798ae0',
        'displayValue': '25000 - 50000'
      }, {
        'minvalue': '50000',
        'maxvalue': '100000',
        'code': '#5d71c9',
        'displayValue': '10000 - 25000'
      }, {
        'minvalue': '100000',
        'maxvalue': '250000',
        'code': '#5062b5',
        'displayValue': '100000 - 250000'
      }, {
        'minvalue': '250000',
        'maxvalue': '500000',
        'code': '#394785',
        'displayValue': '250000 >'
      }]
    };
    var regionsMap = {
      'აფხაზეთი': '01',
      'აჭარა': '02',
      'გურია': '03',
      'იმერეთი': '04',
      'კახეთი': '05',
      'ქვემო ქართლი': '06',
      'მცხეთა - მთიანეთი': '07',
      'რაჭა - ლეჩხუმი და ქვემო სვანეთი': '08',
      'სამცხე - ჯავახეთი': '09',
      'შიდა ქართლი': '10',
      'სამეგრელი - ზემო სვანეთი': '11',
      'თბილისი': '12'
    };
    var data = [];
    _.forIn(this.demographics, demography => {
      if (demography && demography.region) {
        var id = regionsMap[demography.region.geo];
        var value = demography.lastValue.value;
        data.push({id, value});
      }
    });
    return {chart, colorrange, data};
  }

  //showDemographyInfo(event, demographyRegionName) {
  //  if (this.selectedDemography.region.geo !== demographyRegionName) {
  //    $('#selectedDemography').removeClass('hidden');
  //    this.selectedDemography = this.demographics.filter(demography => demography.region.geo === demographyRegionName)[0];
  //    $('#selectedDemography').css({"top": event.pageY + 20, "left": event.pageX - 50});
  //  }
  //}
  //
  //hideDemographyInfo(demographyRegionName) {
  //  if (this.selectedDemography.region.geo !== demographyRegionName) {
  //    $('#selectedDemography').addClass('hidden');
  //  }
  //}

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
