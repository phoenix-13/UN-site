'use strict';

export default class {
  constructor($timeout) {
    'ngInject';
    this.partners.forEach(partner => {
      if (partner.link.substring(0, 7) !== 'http://' && partner.link.substring(0, 8) !== 'https://') {
        partner.link = 'http://' + partner.link;
      }
    });
    $timeout(() => this.initOwlCarousel())
  }

  initOwlCarousel() {
    //$("#owl2-partners").owlCarousel({
    //  autoPlay: 7000,
    //  items : 7,
    //  itemsDesktop : [1199,5],
    //  itemsDesktopSmall : [979,3],
    //  navigation:true,
    //  //navigationText: ["<i class='fa fa-angle-left fa-3x'></i>", "<i class='fa fa-angle-right fa-3x'></i>"]
    //});

    var owl = $("#owl2-partners");

    $('#owl2-partners').owlCarousel({
      items:5,
      loop:true,
      nav:true,
      dots:false,
      autoplay: true,
      autoplayTimeout:3000,
      autoplayHoverPause:true
    });

    console.log(owl);
    $(".next").click(function(){
      owl.trigger('next.owl.carousel');
    })
    $(".prev").click(function(){
      owl.trigger('prev.owl.carousel', [200]);
    })
  }
}
