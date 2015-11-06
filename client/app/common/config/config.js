'use strict';

import routerConfig from './router.config';
import stateConfig from './state.config';
import restangularConfig from './restangular.config';

export default angular
  .module('config', [])
  .config(routerConfig)
  .config(restangularConfig)
  .run(stateConfig);
