'use strict';

export default class {
  constructor($scope, $timeout, content, latestPublications, categories) {
    'ngInject';
    this.$scope = $scope;
    this.categories = categories;
    this.latestPublications = latestPublications.slice(0, 3);
    this.firstLevelPrimaryArticles = content.featured.slice(0, 3);
    this.secondLevelPrimaryArticles = content.featured.slice(3);
    this.banner = content.banner;
    this.slider = content.slider;
    this.sliderPlaying = true;
    $timeout(() => this.initOwlCarousel());
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
