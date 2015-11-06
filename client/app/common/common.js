'use strict';

//inject:import
import config from './config/config';
import resources from './resources/resources';
//endinject

export default angular.module('app.common', [
  //inject:ngmodule
  config.name,
  resources.name,
  //endinject
]);
