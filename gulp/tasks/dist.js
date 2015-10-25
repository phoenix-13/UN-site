'use strict';

import gulp from 'gulp';
import runSequence from 'run-sequence';
import paths from '../paths';
import {FILES_TO_INJECT_FOR_DIST, JSPM_PACKAGES_FOR_DIST} from '../consts';
import {copy} from '../helpers';
import Builder from 'systemjs-builder';
var $ = require('gulp-load-plugins')();

gulp.task('dist', done =>
  runSequence('cleanDist', [
    'inject',
    'distPackages',
    'distAssets',
    'distExtras',
    'distIndex',
  ], 'indexHtmlReplace', done)
);

gulp.task('distPackages', () =>
  gulp.src(JSPM_PACKAGES_FOR_DIST, {base: '.'}) // base due to fonts
    .pipe(gulp.dest(paths.dist.basePath))
);

gulp.task('distAssets', () =>
  copy(paths.app.assets, `${paths.dist.basePath}assets`)
);

gulp.task('distExtras', () =>
  copy(paths.app.extras, paths.dist.basePath)
);

gulp.task('distIndex', () =>
  copy(paths.app.html, paths.dist.basePath)
);

gulp.task('indexHtmlReplace', ['injectDistFiles'], () => {
  var userefAssets = $.useref.assets();

  return gulp.src(paths.dist.html)
    .pipe(userefAssets)
    .pipe($.rev())
    .pipe(userefAssets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest(paths.dist.basePath));
});

gulp.task('injectDistFiles', ['bundle'], () =>
  gulp.src(paths.dist.html)
    .pipe($.inject(
      gulp.src(FILES_TO_INJECT_FOR_DIST, {
        read: false,
        cwd: paths.dist.basePath
      }), {
        relative: false
      })
    )
    .pipe(gulp.dest(paths.dist.basePath))
);

gulp.task('bundle', ['compileStyles', 'compileScripts'], () => {
  const builder = new Builder();
  const inputPath = `${paths.tmp.basePath}app/app.js`;
  const outputPath = `${paths.dist.basePath}build.js`;

  return builder.loadConfig(`${paths.root}jspm.conf.js`)
    .then(() =>
      builder.buildSFX(inputPath, outputPath)
      // builder.buildSFX(inputPath, outputPath, {minify: true})
   );
});
