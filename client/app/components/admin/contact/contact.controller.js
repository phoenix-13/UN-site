'use strict';

export default class {
  constructor($timeout, content) {
    'ngInject';
    this.contacts = content.contacts;
    console.log(this.contacts);
    $timeout(() => this.initMap());
  }

  initMap() {
    var contactLocation = {lat: this.contacts.coordinates.latitude, lng: this.contacts.coordinates.longitude};
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
      this.contacts.coordinates.latitude = this.marker.position.lat();
      this.contacts.coordinates.longitude = this.marker.position.lng();
      this.updateContact();
    });
  }

  updateContact() {

  }
}
