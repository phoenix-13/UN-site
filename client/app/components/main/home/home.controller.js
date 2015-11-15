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

    var owl = $('#owl2-slider');
    owl.owlCarousel({
        items:1,
        loop:true,
        margin:10,
        autoplay:true,
        autoplayTimeout:2000,
        autoplayHoverPause:true
    });
    $('.play').on('click',function(){
        owl.trigger('play.owl.autoplay',[2000])
    })
    $('.stop').on('click',function(){
        owl.trigger('stop.owl.autoplay')
    })

  }
}
