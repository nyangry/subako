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
gulp.task('default', ['browser-sync', 'jade', 'sass', 'css', 'fonts', 'js'], function () {
  gulp.watch('src/jade/*.jade', ['jade', 'reload']);
  gulp.watch('src/css/*.scss', ['sass', 'css', 'reload']);
  gulp.watch('src/js/*.js', ['js', 'reload']);
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

// convert jade to html
gulp.task('jade', function() {
  gulp.src('src/jade/*.jade')
  .pipe(jade())
  .pipe(gulp.dest('dist'));
});

// convert sass to css
gulp.task('sass', function() {
  gulp.src('src/css/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('src/css'));
});

// minify and concat css
gulp.task('css', function() {
  gulp.src([
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/bootflat/bootflat/css/bootflat.min.css',
    'src/css/style.css'
  ])
  .pipe(minifyCss())
  .pipe(concat('app.css'))
  .pipe(gulp.dest('dist/css'));
});

// copy fonts into dist/fonts
gulp.task('fonts', function() {
  gulp.src('node_modules/bootstrap/dist/fonts/**')
  .pipe(gulp.dest('dist/fonts'));
});

// minify and concat js
gulp.task('js', function() {
  gulp.src([
    'node_modules/bootflat/js/jquery-1.10.1.min.js',
    'node_modules/bootstrap/js/transition.js',
    'node_modules/bootstrap/js/tab.js'
  ])
  .pipe(uglify({
    preserveComments: 'license'
  }))
  .pipe(concat('app.js'))
  .pipe(gulp.dest('dist/js'));
});

// convert and minify and distribution into dist
