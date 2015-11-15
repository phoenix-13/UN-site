'use strict';

import 'font-awesome/css/font-awesome.css!';
import 'bootstrap/css/bootstrap.min.css!';
import 'textAngular/dist/textAngular.css!';
import 'OwlCarousel/dist/assets/owl.carousel.min.css!';
import 'OwlCarousel/dist/assets/owl.theme.default.min.css!';

import 'jquery';
import 'angular';
import 'angular-animate';
import 'angular-cookies';
import 'angular-messages';
import 'angular-translate';
import 'angular-ui-router';
import 'angular-bootstrap';
import 'restangular';
import 'angular-material';
import 'textAngular/dist/textAngular-sanitize';
import 'textAngular/dist/textAngularSetup';
import 'textAngular/dist/textAngular';
import 'danialfarid/ng-file-upload';
import 'OwlCarousel/dist/owl.carousel';

export default angular.module('dependencies', [
  'ngAnimate',
  'ngCookies',
  'ngMessages',
  'ngSanitize',
  'ngMaterial',
  'pascalprecht.translate',
  'ui.router',
  'ui.bootstrap',
  'restangular',
  'textAngular',
  'ngFileUpload'
]);
