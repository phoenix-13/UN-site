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
    this.indexValuesByYears();
    $timeout(() => this.initOwlCarousel());
  }

  indexValuesByYears() {
    this.demographics.forEach(demography => {
      demography.lastValue = demography.values[demography.values.length - 1];
      demography.lastValue.region = demography.region;
      demography.values = _.indexBy(demography.values, 'year');
    });
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
      owl.trigger('stop.owl.autoplay');
      this.$scope.$apply(() => this.sliderPlaying = false);
    });
  }
}
