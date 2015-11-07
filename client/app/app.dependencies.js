'use strict';

import 'font-awesome/css/font-awesome.css!';
import 'bootstrap/css/bootstrap.min.css!';
import 'textAngular/dist/textAngular.css!';

import 'angular';
import 'angular-animate';
import 'angular-cookies';
import 'angular-messages';
import 'angular-translate';
import 'angular-ui-router';
import 'restangular';
import 'angular-material';
import 'textAngular/dist/textAngular-sanitize';
import 'textAngular/dist/textAngularSetup';
import 'textAngular/dist/textAngular';
import 'danialfarid/ng-file-upload';

export default angular.module('dependencies', [
  'ngAnimate',
  'ngCookies',
  'ngMessages',
  'ngSanitize',
  'ngMaterial',
  'pascalprecht.translate',
  'ui.router',
  'restangular',
  'textAngular',
  'ngFileUpload'
]);
