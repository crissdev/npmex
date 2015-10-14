'use strict';

var express = require('express');
var liveReload = require('connect-livereload');
var tinyLr = require('tiny-lr')();
var watch = require('node-watch');

var config = {
  web: {port: 4000, host: '0.0.0.0'},
  lr: {port: 4001, host: '0.0.0.0'}
};

var app = express();
app.use(liveReload(config.lr));
app.use(express.static(__dirname));

tinyLr.listen(config.lr.port, config.lr.host);
app.listen(config.web.port, config.web.host);

watch(['app/', 'assets/', 'index.html', 'config.js'], {recursive: true}, function(filename) {
  tinyLr.changed({body: {files: [filename]}});
});

console.log(`Server started (http://${config.web.host}:${config.web.port})`);
