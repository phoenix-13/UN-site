'use strict';

export default class {
  constructor(ContentResource, $state, $timeout, content) {
    'ngInject';
    this.$state = $state;
    this.ContentResource = ContentResource;
    this.contacts = content.contacts;
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
    });
  }

  updateContact() {
    this.ContentResource.updateContact({contacts: this.contacts})
      .then(() => this.$state.reload());
  }
}
