'use strict';

var fs = require('fs'),
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

var root = fs.realpathSync(__dirname + '/..'),
    npm = fs.realpathSync(__dirname + '/../..') + '/node_modules',
    dist = root + '/dist',
    src = root + '/src';

exports.npm = npm;
exports.dist = dist;
exports.src = src;