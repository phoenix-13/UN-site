'use strict';

import pkg from '../package.json';

export const SERVER_SSH = `lucy@`;

export const RELEASE_NAME = `release-${pkg.name}`;

export const BROWSER_SYNC_PORT = 4000;

export const API_URL = 'http://127.0.0.1:9000';

export const COMPILER_OPTIONS = {
  stage: 1,
  modules: 'system',
  moduleIds: false,
  externalHelpers: true,
  comments: true,
  compact: false,
};

const externalHelpersPath = 'jspm_packages/npm/babel-core@5.8.25/external-helpers.min.js';

export const FILES_TO_INJECT_FOR_DIST = [
  externalHelpersPath,
  'build.js',
  'build.css',
];

export const JSPM_PACKAGES_FOR_DIST = [
  externalHelpersPath,
  'jspm_packages/npm/font-awesome@4.4.0/fonts/**',
];
