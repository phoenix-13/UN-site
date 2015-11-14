'use strict';

export default class {
  constructor($timeout, content) {
    'ngInject';
    this.contacts = content.contacts;
    this.location = content.contacts.coordinates;
    this.message = {};
    $timeout(() => this.initMap());
  }

  initMap() {
    var contactLocation = {lat: this.location.latitude, lng: this.location.longitude};
    var styles = this.getMapStyles();

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

    this.map.setOptions({styles});

    var image = {
      url: '/assets/images/red_marker.ico',
      scaledSize: new google.maps.Size(60, 60),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 30)
    };

    this .marker = new google.maps.Marker({
      map: this.map,
      position: contactLocation,
      icon: image
    });
  }

  getMapStyles() {
    return [{
      "featureType": "landscape",
      "stylers": [
        {
          "saturation": -100
        },
        {
          "lightness": 65
        },
        {
          "visibility": "on"
        }
      ]
    },
      {
        "featureType": "poi",
        "stylers": [
          {
            "saturation": -100
          },
          {
            "lightness": 51
          },
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "stylers": [
          {
            "saturation": -100
          },
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "stylers": [
          {
            "saturation": -100
          },
          {
            "lightness": 30
          },
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "road.local",
        "stylers": [
          {
            "saturation": -100
          },
          {
            "lightness": 40
          },
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "saturation": -100
          },
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "administrative.province",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "lightness": -25
          },
          {
            "saturation": -100
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "hue": "#ffff00"
          },
          {
            "lightness": -25
          },
          {
            "saturation": -97
          }
        ]
      }
    ];
  }
}
