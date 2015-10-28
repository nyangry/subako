var gulp        = require('gulp');
var browserify  = require('gulp-browserify');
var jade        = require('gulp-jade');
var sass        = require('gulp-sass');
var minifyCss   = require('gulp-minify-css');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
var rename      = require('gulp-rename');
var browserSync = require('browser-sync').create();

var dist = './dist';
var src  = './src';

// default task
gulp.task('default', ['browser-sync'], function () {
  gulp.watch('dist/*.html', ['reload']);
  gulp.watch('dist/*.css', ['reload']);
  gulp.watch('dist/*.js', ['reload']);
});

// sync browser
gulp.task('browser-sync', function() {
  browserSync.init({
    port: 8080,
    server: {
      baseDir: 'dist',
      index: 'popup.html'
    }
  });
});

// reload browser
gulp.task('reload', function () {
  browserSync.reload();
});

// copy bootflat files into src

// convert jade to html
gulp.task('jade', function() {
  gulp.src('./src/jade/*.jade')
  .pipe(jade())
  .pipe(gulp.dest('./dist/'));
});

// convert sass to css
gulp.task('convert-sass', function() {
});

// minify and concat css
gulp.task('css', function() {
  gulp.src([
    './node_modules/bootflat/bootflat/css/bootflat.min.css'
  ])
  .pipe(minifyCss())
  .pipe(concat('app.css'))
  .pipe(gulp.dest('dist/css'));
});

// minify and concat js
gulp.task('js', function() {
  gulp.src([
    './node_modules/bootflat/js/bootstrap.min.js'
  ])
  .pipe(uglify({
    preserveComments: 'license'
  }))
  .pipe(concat('app.js'))
  .pipe(gulp.dest('dist/js'));
});

// convert and minify and distribution into dist

// watch src
