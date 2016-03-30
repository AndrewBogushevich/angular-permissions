'use strict';

var config = require('./config'),
	eventStream = require('event-stream'),
	$ = require('gulp-load-plugins')(),
	gulp = require('gulp');

gulp.task('css-app:build', function() {
	return gulp.src(config.src + '/styles/app.less')
		.pipe($.less({
			paths: [
				config.src + '/styles/components'
			]
		}))
		.pipe($.autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest(config.dist + '/css'));
});

gulp.task('js-app:build', function() {
	return eventStream.concat(
        gulp.src([
            config.src + '/app.js',
            config.src + '/**/*.js'
        ]),
        gulp.src(config.src + '/**/*.html')
		.pipe($.minifyHtml({
			empty: true,
			spare: true,
			quotes: true
		}))
		.pipe($.angularTemplatecache('templates.js', {
			module: 'angular-permissions'
		}))
	)
		.pipe($.concat('app.js'))
		.pipe(gulp.dest(config.dist + '/js'));
});

gulp.task('js-vendor:build', function() {
    return gulp.src([
        config.npm + '/angular/angular.js',
    ])
        // .pipe($.uglify())
        .pipe($.concat('vendor.js'))
        .pipe(gulp.dest(config.dist + '/js'));
});

gulp.task('build', function(callback) {
	$.sequence('clean', [
		'css-app:build',
        'js-vendor:build',
		'js-app:build'
	])(callback);
});
