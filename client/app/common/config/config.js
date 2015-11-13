'use strict';

import routerConfig from './router.config';
import stateConfig from './state.config';
import restangularConfig from './restangular.config';
import materialConfig from './material.config';
import editorConfig from './editor.config';
import interceptorsConfig from './interceptors.config';

export default angular
  .module('config', [])
  .config(interceptorsConfig)
  .config(routerConfig)
  .config(restangularConfig)
  .config(materialConfig)
  .config(editorConfig)
  .run(stateConfig);
