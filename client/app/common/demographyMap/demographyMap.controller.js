'use strict';

export default class {
  constructor(demographyModal, DemographyResource, Toast, $state) {
    'ngInject';

    this.demographyModal = demographyModal;
    this.DemographyResource = DemographyResource;
    this.Toast = Toast;
    this.$state = $state;
    this.initDemographicsMap();
  }

  initDemographicsMap() {
    FusionCharts.ready(() => {
      var map = new FusionCharts({
        type: 'maps/asiageorgia',
        renderAt: 'chart-container',
        width: this.width,
        height: this.height,
        dataFormat: 'json',
        dataSource: {
          chart: this.getChart(),
          colorrange: this.getColorrange(),
          data: this.getRangedDemographyData()
        },
        events: {
          "entityClick" : (evt, data) => {
            _.forIn(this.demographics, demography => {
              if (demography.id === data.id) {
                this.openDemographyModal(demography);
              };
            });
          }
        }
      }).render();
    });
  }

  openDemographyModal(demography) {
    this.demographyModal
      .open(demography)
      .then(yearValues => this.DemographyResource.updateDemography(demography._id, {yearValues}))
      .then(() => this.Toast.show('Demography Updated Successfully!'))
      .then(() => this.$state.reload());
  }

  getChart() {
    return {
      bgColor: this.bgColor,
      baseFont: 'BPG Nino Mtavruli',
      baseFontSize: 16,
      useHoverColor: 0,
      theme: 'fint',
      formatNumberScale: 0,
      showToolTip: 0,
    };
  }

  getColorrange() {
    return {
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
  }

  getRangedDemographyData() {
    var regionsMap = {'აფხაზეთი': '01', 'აჭარა': '02', 'გურია': '03',
      'იმერეთი': '04', 'კახეთი': '05', 'ქვემო ქართლი': '06', 'მცხეთა - მთიანეთი': '07',
      'რაჭა - ლეჩხუმი და ქვემო სვანეთი': '08', 'სამცხე - ჯავახეთი': '09', 'შიდა ქართლი': '10',
      'სამეგრელი - ზემო სვანეთი': '11', 'თბილისი': '12'
    };
    var data = [];
    _.forIn(this.demographics, demography => {
      if (demography && demography.region) {
        var id = regionsMap[demography.region.geo];
        var value = demography.values.length
          ? demography.values[demography.values.length - 1].value
          : 0;
        demography.id = id;
        data.push({id, value});
      }
    });
    return data;
  }
}
