'use strict';

var config = require('./config'),
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')();

gulp.task('clean', function() {
	return gulp.src(config.dist + '/*', {read: false})
		.pipe($.clean({force: true}));
});
