'use strict';

//inject:import
import config from './config/config';
//endinject

export default angular.module('app.common', [
  //inject:ngmodule
  config.name,
  //endinject
]);
