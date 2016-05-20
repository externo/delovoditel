// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-htmlmin');
var clean = require('gulp-clean');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');

// tasks
gulp.task('lint', function() {
  gulp.src(['./app/js/lib/*.js', '!./app/bower_components/**'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});
gulp.task('clean', function() {
  gulp.src('dist', {read: false})
    .pipe(clean());
});
gulp.task('minify-html', function() {
  gulp.src(['app/**/*.html', '!app/node_modules/**/*.*'])
    .pipe(minifyHTML({collapseWhitespace: true}))
    //.pipe(gzip())
    .pipe(gulp.dest('dist'))
});
gulp.task('minify-css', function() {
  var opts = {comments:true,spare:true};
  gulp.src(['./app/assets/styles/*.css'])
    .pipe(concat('all.css'))
    .pipe(minifyCSS(opts))
    //.pipe(gzip())
    .pipe(gulp.dest('./dist/assets/styles'));
});
gulp.task('copy-assets', function () {
  gulp.src(['./app/**/*.*', '!./app/states/**/*.html', '!./app/js/**/*.*'])
    .pipe(gulp.dest('./dist'));
});
gulp.task('browserify-js', function() {
  gulp.src(['app/js/app.js'])
    .pipe(browserify({
      insertGlobals: true,
      debug: true
    }))
    .pipe(concat('bundled.js'))
    .pipe(gulp.dest('./dist'));
});
gulp.task('minify-js', function() {
  gulp.src(['app/node_modules/jquery/dist/jquery.js', 'app/bundled.js', 'app/js/lib/mobile-menu.js'])
    .pipe(concat('all.js'))
    .pipe(uglify({
      // inSourceMap:
      // outSourceMap: "app.js.map"
    }))
    //.pipe(gzip())
    .pipe(gulp.dest('./dist/'));
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
gulp.task('build', function() {
  runSequence(
    [
      'clean',
      'minify-html',
      //'minify-css',
      'copy-assets',
      'browserify-js',
      //'minify-js',
      'connect-dist'
    ]
  );
});
