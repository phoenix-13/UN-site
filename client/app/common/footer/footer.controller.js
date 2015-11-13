'use strict';

export default class {
  constructor() {
    'ngInject';

    $("#owl-demo").owlCarousel({
        // autoPlay: 3000,
        items : 7,
        itemsDesktop : [1199,5],
        itemsDesktopSmall : [979,3],
        navigation:true,
        navigationText: [
        "<i class='fa fa-angle-left fa-3x'></i>",
        "<i class='fa fa-angle-right fa-3x'></i>"
        ],
    });

  }
}
