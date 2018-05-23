/**
 * Load gulp
 * Load Plugins
 */
var env     = "prod";
var gulp    = require('gulp'),
  sass      = require('gulp-sass'),
  sourcemaps= require('gulp-sourcemaps'),
  cleanCSS  = require('gulp-clean-css'),
  uglify    = require('gulp-uglify'),
  rename    = require('gulp-rename'),

  browserify= require('browserify'),
  babelify  = require('babelify'),
  source    = require('vinyl-source-stream');
  buffer    = require('vinyl-buffer');

var buildDir = "../../../public/build/web/default";


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
gulp.task('style', function () {
  var App = gulp.src('src/scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', swallowError)
    .pipe(rename('app.min.css'))
    .pipe(sourcemaps.write(''));

  // Prod Mode
  if (env == "prod") App.pipe(cleanCSS());

  // Write
  App.pipe(gulp.dest(buildDir));

  // Auth.css
  var Auth = gulp.src('src/scss/auth.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', swallowError)
    .pipe(rename('auth.min.css'))
    .pipe(sourcemaps.write(''));

  // Prod Mode
  if (env == "prod") Auth.pipe(cleanCSS());

  // Write
  Auth.pipe(gulp.dest(buildDir));
});
gulp.task('styleWatch', function () {
  return gulp.watch(['src/scss/**/*.scss'], ['style'])
});


/**
 * Scripts
 * Concat & Minify JS
 */
gulp.task('script', function () {
  var scripts = browserify({
    entries: 'src/js/app.js',
    debug: false
  })
    .transform(babelify, {presets: ["es2015"]}).bundle()
    .on('error', swallowError)
    .pipe(source(buildDir + '/app.min.js'))
    .pipe(buffer())

  // Compress
  if (env == 'prod') {
    scripts.pipe(uglify());
  }

  return scripts.pipe(gulp.dest(''));
});
gulp.task('scriptWatch', function () {
  return gulp.watch(['src/js/**/*.js'], ['script'])
});


/**
 * Copy Dependencies
 */
gulp.task('copyfile', function () {
    //gulp.src('node_modules/ace-builds/src-min/**/*').pipe(gulp.dest('plugins/ace'));
});


/**
 * gulp RUN
 */
gulp.task('default', ['style', 'script']);
gulp.task('dev', function () {
  env = 'dev';
  gulp.start(['style', 'script', 'styleWatch', 'scriptWatch'])
});