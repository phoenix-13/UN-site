'use strict';

export default class {
  constructor(Toast, $timeout, emailService, content) {
    'ngInject';
    this.Toast = Toast;
    this.contacts = content.contacts;
    this.emailService = emailService;
    this.location = content.contacts.coordinates;
    this.message = {};
    $timeout(() => this.initMap());
  }

  sendEmail(form) {
    if (form.$valid) {
      this.emailService.sendEmail(this.message)
        .then(() => this.Toast.show('Email Sent Successfully!'))
        .catch(() => this.Toast.show('Email Has Not Sent!'))
    }
  }

  initMap() {
    var contactLocation = {lat: this.location.latitude, lng: this.location.longitude};

    this.map = new google.maps.Map(document.getElementById('contact-map'), {
      center: contactLocation,
      scrollwheel: false,
      zoom: 13,
      disableDefaultUI: true,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false
    });


    var image = {
      url: '/assets/images/marker.png',
      scaledSize: new google.maps.Size(46, 46),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 23)
    };

    this .marker = new google.maps.Marker({
      map: this.map,
      position: contactLocation,
      icon: image
    });
  }
}
