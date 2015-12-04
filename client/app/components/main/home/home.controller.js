'use strict';

export default class {
  constructor($document, $scope, $timeout, content, latestPublications, categories, demographics, LangService) {
    'ngInject';
    this.LangService = LangService;
    this.$document = $document;
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
    $timeout(() => $('.recent_publications *').removeAttr('style'));
    $timeout(() => this.initOwlCarousel());
    this.listedToScrollEventAndToggleScrollButton();
  }

  listedToScrollEventAndToggleScrollButton() {
    this.scrollButtonOpacity = 0;
    angular.element(this.$document).on('scroll', () => {
      this.scrollButtonOpacity = document.body.scrollTop / 100;
      this.$scope.$apply();
    });
  }

  engPublicationExists(publication){
    return this.LangService.getCurrent() === 'geo'
      || (publication.title.eng || publication.content.eng);
  }

  indexValuesByYears() {
    this.demographicsTotalValue = 0;
    this.demographicsMaxYear = 2015;
    this.demographics.forEach(demography => {
      if (demography.values.length) {
        demography.lastValue = demography.values[demography.values.length - 1];
      } else {
        demography.lastValue = {year: 2015, value: 0};
      }
      demography.lastValue.region = demography.region;
      demography.values = _.indexBy(demography.values, 'year');
      this.demographicsTotalValue += demography.lastValue.value;
      if (demography.lastValue.year > this.demographicsMaxYear) {
        this.demographicsMaxYear = demography.lastValue.year;
      }
    });
  }

  addDemographicsPropertyLastValue() {
    this.demographics.forEach(demography => {
      demography.lastYearValue = (demography.values && demography.values.length > 0)
        ? demography.values[demography.values.length - 1].value
        : 0;
    });
  }

  // showScrollButton() {
  //   return document.body.scrollTop >= 100;
  // }

  scrollTop() {
    this.$document.scrollTo(0, 0, 1000);
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
