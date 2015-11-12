'use strict';

import ContentResource from './content.resource';
import ImageResource from './image.resource';
import IndicatorResource from './indicator.resource';
import CategoryResource from './category.resource';
import PublicationResource from './publication.resource';

export default angular
  .module('resources', [])
  .factory('ContentResource', ContentResource)
  .factory('ImageResource', ImageResource)
  .factory('CategoryResource', CategoryResource)
  .factory('PublicationResource', PublicationResource)
  .factory('IndicatorResource', IndicatorResource);
