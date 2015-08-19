var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

gulp.task('js', function() {
	return gulp.src('source/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/'));
});

gulp.task('default', function() {
	gulp.watch('source/*.js', ['js']);
});
