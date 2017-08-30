var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('js', function() {
	return gulp.src('source/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/'));
});

gulp.task('sass', function() {
	return gulp.src('source/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('default', function() {
	gulp.watch(['source/*.js','source/scss/*.scss'], ['js','sass']);
});
