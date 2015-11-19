'use strict';

//inject:import
import config from './config/config';
import footer from './footer/footer';
import header from './header/header';
import modals from './modals/modals';
import resources from './resources/resources';
import services from './services/services';
import translate from './translate/translate';
//endinject

export default angular.module('app.common', [
  //inject:ngmodule
  config.name,
  footer.name,
  header.name,
  modals.name,
  resources.name,
  services.name,
  translate.name,
  //endinject
]);
