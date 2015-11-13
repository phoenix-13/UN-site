'use strict';

export default class {
  constructor() {
    'ngInject';
    $("#owl2").owlCarousel({
        autoPlay: 5000,
        singleItem: true,
        navigation: false
    });
  }
}
