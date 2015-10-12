'use strict';

var express = require('express');
var liveReload = require('connect-livereload');
var tinyLr = require('tiny-lr')();
var watch = require('node-watch');

var config = {
  host: '0.0.0.0',
  port: 3000
};

var app = express();
app.use(liveReload());
app.use(express.static(__dirname));

tinyLr.listen(35729, config.host);
app.listen(config.port, config.host);

watch(['app/', 'assets/', 'index.html', 'config.js'], {recursive: true }, function(filename) {
  tinyLr.changed({body: {files: [filename]}});
});

console.log(`Server started (http://${config.host}:${config.port})`);
