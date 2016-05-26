var gulp = require('gulp');
var plumber = require('gulp-plumber');
var connect = require('gulp-connect');
//var jshint = require('gulp-jshint');
var uglify = require('gulp-uglifyjs');
var cleanCSS = require('gulp-clean-css');
var minifyHTML = require('gulp-htmlmin');
var clean = require('gulp-clean');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');

gulp.task('lint', function () {
  gulp.src(['./app/js/lib/*.js', '!./app/bower_components/**'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});
gulp.task('clean', function () {
  gulp.src(['dist'], {read: false})
    .pipe(clean());
});
gulp.task('minify-css', function() {
  gulp.src('app/assets/style.css')
    .pipe(plumber())
    .pipe(cleanCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('dist/assets'));
});
gulp.task('minify-html', function () {
  gulp.src(['app/**/*.html', '!./app/node_modules/**/*.*'])
    .pipe(minifyHTML({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});
gulp.task('copy-fonts', function () {
  gulp.src(['./app/assets/fonts/*.*', '!./app/assets/fonts/*.css'])
    .pipe(gulp.dest('./dist/assets/fonts'));
});
gulp.task('copy-sounds', function () {
  gulp.src(['./app/assets/sounds/*.*'])
    .pipe(gulp.dest('./dist/assets/sounds'));
});
gulp.task('copy-patterns', function () {
  gulp.src(['./app/patterns/**/*.*'])
    .pipe(gulp.dest('./dist/patterns'));
});
gulp.task('copy-node_modules', function () {
  gulp.src(['./app/node_modules/**/*.*'])
    .pipe(gulp.dest('./dist/node_modules'));
});
gulp.task('browserify-js', function () {
  gulp.src(['app/js/app.js'])
    .pipe(browserify({
      insertGlobals: true,
      debug: true
    }))
    .pipe(concat('bundled.js'))
    .pipe(gulp.dest('./app'));
});
gulp.task('concat-js', function () {
  gulp.src([
    'app/node_modules/jquery/jquery-2.2.3.js',
    'app/assets/bootstrap/js/bootstrap.js',
    'app/assets/dist/js/app.js',
    'app/bundled.js',
    'app/assets/plugins/moment.min.js',
    'app/assets/plugins/daterange/daterangepicker.js',
    'app/assets/plugins/calendar/fullcalendar.js',
    'app/node_modules/docxtemplater/build/docxgen.js',
    'app/node_modules/docxtemplater/build/angular-expressions.js',
    'app/node_modules/docxtemplater/vendor/jszip-utils.js',
    'app/node_modules/docxtemplater/vendor/FileSaver.min.js',
    'app/node_modules/ion-sound/js/ion.sound.min.js',
    'app/assets/lock.min.js',
    'app/node_modules/noty/js/noty/packaged/jquery.noty.packaged.js',
  ])
    .pipe(plumber())
    .pipe(concat('all.min.js'))
    .pipe(uglify( { } ))
    .pipe(gulp.dest('./dist'));
});
gulp.task('connect-app', function () {
  connect.server({
    root: 'app/',
    port: 9999
  });
});
gulp.task('connect-dist', function () {
  connect.server({
    root: 'dist/',
    port: 9999
  });
});
gulp.task('build', function () {
  runSequence(
    [
      'clean',
      'browserify-js',
      'copy-fonts',
      'copy-sounds',
      'copy-patterns',
      'minify-css',
      'minify-html',
      'concat-js',
      'connect-dist'
    ]
  );
});
