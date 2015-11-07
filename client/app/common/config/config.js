'use strict';

import routerConfig from './router.config';
import stateConfig from './state.config';
import restangularConfig from './restangular.config';
import materialConfig from './material.config';

export default angular
  .module('config', [])
  .config(routerConfig)
  .config(restangularConfig)
  .config(materialConfig)
  .run(stateConfig);
