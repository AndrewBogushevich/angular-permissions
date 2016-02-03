'use strict';

var config = require('./config'),
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')();

gulp.task('css-app:update', function(callback) {
	$.sequence('css-app:build', 'postbuild')(callback);
});
gulp.task('js-app:update', function(callback) {
	$.sequence('js-app:build', 'postbuild')(callback);
});

gulp.task('watch', function(callback) {
	gulp.watch(config.src + '/**/*.less', ['css-app:update']);
	gulp.watch([
		config.src + '/**/*.js',
		config.src + '/**/*.html'
	], ['js-app:update']);
});
