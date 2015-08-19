var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass');

gulp.task('js', function() {
	return gulp.src('source/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/'));
});

gulp.task('css', function() {
	return gulp.src('source/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('build/'));
});

gulp.task('default', function() {
	gulp.watch('source/*.js', ['js']);
	gulp.watch('source/*.scss', ['css']);
});