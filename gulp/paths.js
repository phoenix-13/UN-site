'use strict';

import path from 'path';

const root = `${path.dirname(__dirname)}/`;

const paths = {
  root: root,

  gulpfile: [`${root}gulpfile.js`, `${root}gulp/**/*.js`],

  generatorTemplates: {
    common: `${root}gulp/generator/common/**`,
    mainComponent: `${root}gulp/generator/main-component/**`,
    adminComponent: `${root}gulp/generator/admin-component/**`,
  },

  app: {
    basePath: `${root}client/`,
    html: `${root}client/index.html`,
    templates: `${root}client/app/**/*.html`,
    styles: `${root}client/app/**/*.styl`,
    scripts: `${root}client/app/**/*.js`,
    assets: `${root}client/assets/**/*`,
    extras: `${root}client/{.htaccess,robots.txt,favicon.ico}`,
    common: `${root}client/app/common/`,
    components: `${root}client/app/components/`,
  },

  tmp: {
    basePath: `${root}.tmp/`,
    assets: `${root}.tmp/assets/**/*`,
    entryPoint: `${root}.tmp/app/app.js`,
  },

  dist: {
    basePath: `${root}dist/`,
    html: `${root}dist/index.html`,
  }
};

export default paths;
