'use strict';

var fs = require('fs'),
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

var root = fs.realpathSync(__dirname + '/..'),
    bower = root + '/bower_components',
    dist = root + '/dist',
    src = root + '/src';

exports.bower = bower;
exports.dist = dist;
exports.src = src;