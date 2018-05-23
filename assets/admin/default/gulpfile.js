/*
 * This file is part of the EmlakPRO package.
 *
 * @package     EmlakPRO
 * @author      Ramazan APAYDIN <iletisim@ramazanapaydin.com>
 * @copyright   Copyright (c) 2017 - 2018, WriteLN Yazılım Hizmetleri San. Tic. A.Ş (http://writeln.net)
 * @license     LICENSE
 * @link        http://emlakpro.net
 */

/**
 * Load gulp
 * Load Plugins
 */
var env     = "prod",
  gulp    = require('gulp'),
  sass      = require('gulp-sass'),
  sourcemaps= require('gulp-sourcemaps'),
  cleanCSS  = require('gulp-clean-css'),
  uglify    = require('gulp-uglify'),
  rename    = require('gulp-rename'),

  browserify= require('browserify'),
  babelify  = require('babelify'),
  source    = require('vinyl-source-stream');
  buffer    = require('vinyl-buffer');

var buildDir = "../../../public/build/admin/default";


/**
 * Error Handling
 *
 * @param error
 */
function swallowError (error) {
  console.log(error.toString());
  this.emit('end');
}

/**
 * SCSS to CSS
 * Concat & Minify CSS
 */
gulp.task('AppCss', function () {
  var AppCss = gulp.src('src/scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', swallowError)
    .pipe(rename('app.min.css'))
    .pipe(sourcemaps.write(''));

  // Production
  if (env == "prod") AppCss.pipe(cleanCSS());

  // Write
  AppCss.pipe(gulp.dest(buildDir));
});
gulp.task('AppCssWatch', function () {
  return gulp.watch(['src/scss/**/*.scss'], ['AppCss'])
});


/**
 * Scripts
 * Concat & Minify JS
 */
gulp.task('AppScript', function () {
  var scripts = browserify({
    entries: 'src/js/app.js',
    debug: false
  })
    .transform(babelify, {presets: ["es2015"]}).bundle()
    .on('error', swallowError)
    .pipe(source(buildDir + '/app.min.js'))
    .pipe(buffer());

  // Compress
  if (env == 'prod') {
    scripts.pipe(uglify());
  }

  return scripts.pipe(gulp.dest(''));
});
gulp.task('AppScriptWatch', function () {
  return gulp.watch(['src/js/**/*.js'], ['AppScript'])
});


/**
 * Copy Dependencies
 */
gulp.task('copyfile', function () {
    gulp.src('node_modules/ace-builds/src-min/**/*').pipe(gulp.dest(buildDir + '/plugin/ace'));
    gulp.src('node_modules/html5sortable/dist/html.sortable.min.js').pipe(gulp.dest(buildDir + '/plugin/html5sortable'));
    gulp.src('src/xmlstyle.xml').pipe(gulp.dest(buildDir));
    gulp.src('preview.png').pipe(gulp.dest(buildDir));
});


/**
 * Gulp RUN
 */
gulp.task('default', ['AppCss', 'AppScript']);
gulp.task('dev', function () {
  env = 'dev';
  gulp.start(['AppCss', 'AppScript', 'AppCssWatch', 'AppScriptWatch'])
});