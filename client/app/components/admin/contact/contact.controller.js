'use strict';

export default class {
  constructor($timeout, contact) {
    'ngInject';
    this.contact = contact;
    $timeout(() => this.initMap());
  }

  initMap() {
    var contactLocation = {lat: this.contact.location.latitude, lng: this.contact.location.longitude};
    this.map = new google.maps.Map(document.getElementById('contact-map'), {
      center: contactLocation,
      scrollwheel: false,
      zoom: 13
    });

    this.marker = new google.maps.Marker({
      map: this.map,
      position: contactLocation,
      draggable: true
    });

    google.maps.event.addListener(this.marker, 'dragend', () => {
      this.contact.location.latitude = this.marker.position.lat();
      this.contact.location.longitude = this.marker.position.lng();
      this.updateContact();
    });
  }

  updateContact() {
  //  update contact
  }
}
