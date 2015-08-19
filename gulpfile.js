var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	spritesmith = require('gulp.spritesmith'),
	rename = require('gulp-rename');

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

gulp.task('sprite', function(cb) {
	var streams = gulp.src('source/media/*.png')
			.pipe(spritesmith({
				imgName: 'sprite.png',
				imgPath: 'media/sprite.png',
				cssName: '_sprite.scss',
				cssTemplate: 'source/_sprite.tmpl.scss'
			}));

	// Save sprite
	streams.img.pipe(gulp.dest('build/media/'));

	// Generate SCSS file
	streams.css.pipe(gulp.dest('source/.tmp'));
});

gulp.task('default', function() {
	gulp.watch('source/*.js', ['js']);
	gulp.watch('source/*.scss', ['css']);
});