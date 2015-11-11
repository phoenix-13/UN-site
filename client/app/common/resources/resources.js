'use strict';

import ContentResource from './content.resource';
import ImageResource from './image.resource';
import IndicatorResource from './indicator.resource';

export default angular
  .module('resources', [])
  .factory('ContentResource', ContentResource)
  .factory('ImageResource', ImageResource)
  .factory('IndicatorResource', IndicatorResource);
