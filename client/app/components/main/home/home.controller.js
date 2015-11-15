'use strict';

export default class {
  constructor($timeout, content, latestPublications) {
    'ngInject';
    this.latestPublications = latestPublications.slice(0, 3);
    this.firstLevelPrimaryArticles = content.featured.slice(0, 3);
    this.secondLevelPrimaryArticles = content.featured.slice(3);
    this.banner = content.banner;
    this.slider = content.slider;
    $timeout(() => this.initOwlCarousel());
  }

  initOwlCarousel() {
    //$("#owl2-slider").owlCarousel({
    //  autoPlay: 5000,
    //  singleItem: true,
    //  navigation: false
    //});
    $("#owl2-slider").owlCarousel({});
  }
}
