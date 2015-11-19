'use strict';

import routerConfig from './router.config';
import stateConfig from './state.config';
import restangularConfig from './restangular.config';
import materialConfig from './material.config';
import editorConfig from './editor.config';
import interceptorsConfig from './interceptors.config';
import translateConfig from './translate.config';

export default angular
  .module('config', [])
  .config(interceptorsConfig)
  .config(translateConfig)
  .config(routerConfig)
  .config(restangularConfig)
  .config(materialConfig)
  .config(editorConfig)
  .run(stateConfig);
