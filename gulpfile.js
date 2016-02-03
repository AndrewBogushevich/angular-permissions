'use strict';

var fs = require('fs'),
	wrench = require('wrench');

var source = './app/gulp/';
wrench.readdirSyncRecursive(source).filter(function(path) {
	return (/\.js$/i).test(path) && fs.lstatSync(source + path).isFile();
}).map(function(path) {
	require(source + path);
});
