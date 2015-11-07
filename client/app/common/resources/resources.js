'use strict';

import ContentResource from './content.resource';
import ImageResource from './image.resource';

export default angular
  .module('resources', [])
  .factory('ContentResource', ContentResource)
  .factory('ImageResource', ImageResource);
