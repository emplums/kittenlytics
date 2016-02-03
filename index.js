//Http module
var http = require('http');

//Router
var router = require('./lib/router');

//Create Web Server
http.createServer(router).listen(9999);

console.log('Server running at localhost:9999');
