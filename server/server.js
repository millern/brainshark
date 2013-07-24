var express = require('express'),
  fs = require('fs'),
  app = express(),
  server = require('http').createServer(app);

app.use('/lib', express.static(__dirname + '/../app/lib'));
app.use('/', express.static(__dirname + '/../app'));

var port = 8082;

server.listen(port);
console.log("listening on " + port);
