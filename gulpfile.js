var gulp        = require('gulp');
var browserify  = require('gulp-browserify');
var jade        = require('gulp-jade');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
var rename      = require('gulp-rename');
var browserSync = require('browser-sync').create();

var dist = './dist';
var src  = './src';
