'use strict';

import ContentResource from './content.resource';
import ImageResource from './image.resource';
import IndicatorResource from './indicator.resource';
import CategoryResource from './category.resource';
import PublicationResource from './publication.resource';
import DemographyResource from './demography.resource';
import ArticleResource from './article.resource';
import AdminResource from './admin.resource';

export default angular
  .module('resources', [])
  .factory('ContentResource', ContentResource)
  .factory('ImageResource', ImageResource)
  .factory('CategoryResource', CategoryResource)
  .factory('PublicationResource', PublicationResource)
  .factory('DemographyResource', DemographyResource)
  .factory('ArticleResource', ArticleResource)
  .factory('AdminResource', AdminResource)
  .factory('IndicatorResource', IndicatorResource);
