'use strict';

//inject:import
import config from './config/config';
import modals from './modals/modals';
//endinject

export default angular.module('app.common', [
  //inject:ngmodule
  config.name,
  modals.name,
  //endinject
]);
