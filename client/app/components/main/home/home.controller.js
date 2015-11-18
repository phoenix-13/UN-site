'use strict';

export default class {
  constructor($scope, $timeout, content, latestPublications, categories, demographics) {
    'ngInject';
    this.$scope = $scope;
    this.categories = categories;
    this.latestPublications = latestPublications.slice(0, 3);
    this.firstLevelPrimaryArticles = content.featured.slice(0, 3);
    this.secondLevelPrimaryArticles = content.featured.slice(3);
    this.banner = content.banner;
    this.slider = content.slider;
    this.demographics = demographics;
    this.sliderPlaying = true;
    this.populateCategory();
    this.parseSliderLinks();
    this.demographyRangedData = this.getRangedDemographyMapData();
    $timeout(() => this.initOwlCarousel());
  }

  getRangedDemographyMapData() {
    var chart = {'theme': 'fint', 'formatNumberScale': '0'};
    var colorrange = {
      'color': [{
        'minvalue': '0',
        'maxvalue': '10000',
        'code': '#a0debf',
        'displayValue': '< 10000'
      }, {
        'minvalue': '10000',
        'maxvalue': '25000',
        'code': '#7ad1a6',
        'displayValue': '10000 - 25000'
      }, {
        'minvalue': '25000',
        'maxvalue': '50000',
        'code': '#54c48d',
        'displayValue': '25000 - 50000'
      }, {
        'minvalue': '50000',
        'maxvalue': '100000',
        'code': '#3bab74',
        'displayValue': '10000 - 25000'
      }, {
        'minvalue': '100000',
        'maxvalue': '250000',
        'code': '#2e855a',
        'displayValue': '100000 - 250000'
      }, {
        'minvalue': '250000',
        'maxvalue': '500000',
        'code': '#215f40',
        'displayValue': '250000 - 500000'
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
    console.log(this.demographics);
    this.addDemographicsPropertyLastValue();
    _.sortBy(this.demographics, 'lastYearValue');
    _.forIn(this.demographics, demography => {
      if (demography && demography.region) {
        var id = regionsMap[demography.region.geo];
        var value = demography.lastYearValue;
        data.push({id, value});
      }
    });
    return {chart, colorrange, data};
  }

  addDemographicsPropertyLastValue() {
    this.demographics.forEach(demography => {
      demography.lastYearValue = (demography.values && demography.values.length > 0)
        ? demography.values[demography.values.length - 1].value
        : 0;
    });
  }

  populateCategory() {
    this.slider.forEach(slide => {
      this.categories.forEach(category => {
        if (category._id === slide.category) {
          slide.categoryClass = category.title.eng;
        }
      });
    });
  }

  parseSliderLinks() {
    this.slider.forEach(slide => {
      if (slide.link && slide.link.substring(0, 7) !== 'http://' && slide.link.substring(0, 8) !== 'https://') {
        slide.link = 'http://' + slide.link;
      }
    });
  }

  initOwlCarousel() {
    var owl = $('#owl2-slider');
    owl.owlCarousel({
        items:1,
        loop:true,
        margin:10,
        autoplay:true,
        autoplayTimeout:4000,
        autoplayHoverPause:true
    });
    $('.play').on('click', () => {
      owl.trigger('play.owl.autoplay',[4000]);
      this.$scope.$apply(() => this.sliderPlaying = true);
    });
    $('.stop').on('click', () => {
      owl.trigger('stop.owl.autoplay')
      this.$scope.$apply(() => this.sliderPlaying = false);
    });
  }
}
