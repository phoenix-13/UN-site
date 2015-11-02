'use strict';

import pkg from '../package.json';

export const SERVER_SSH = `lucy@162.243.184.90`;
export const RELEASE_NAME = `release-${pkg.name}`;
export const LOCALHOST_PORT = 9000;
export const BROWSER_SYNC_PORT = 4000;

const externalHelpersPath = 'jspm_packages/npm/babel-core@5.8.22/external-helpers.min.js';

export const FILES_TO_INJECT_FOR_DIST = [
  externalHelpersPath,
  'build.js',
  'build.css'
];

export const JSPM_PACKAGES_FOR_DIST = [
  externalHelpersPath,
  'jspm_packages/github/twbs/bootstrap@3.3.5/fonts/**',
  'jspm_packages/npm/font-awesome@4.4.0/fonts/**'
];
