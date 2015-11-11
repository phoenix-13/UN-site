'use strict';

//inject:import
import config from './config/config';
import modals from './modals/modals';
import resources from './resources/resources';
import services from './services/services';
//endinject

export default angular.module('app.common', [
  //inject:ngmodule
  config.name,
  modals.name,
  resources.name,
  services.name,
  //endinject
]);
