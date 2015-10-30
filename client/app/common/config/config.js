'use strict';

import routerConfig from './router.config';
import stateConfig from './state.config';

export default angular.module('config', [])
.config(routerConfig)
.run(stateConfig);
