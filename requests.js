var http = require('http');
var twitterCats = require('twitter.js');

http.createServer(function(request, response) {
  var headers = request.headers;
  var method = request.method;
  var url = request.url;
  var body = [];
  request.on('error', function(err) {
    console.error(err);
  }).on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    body = Buffer.concat(body).toString();


    response.on('error', function(err) {
      console.error(err);
    });


    response.writeHead(200, {'Content-Type': 'application/json'});

    var responseBody = {
      headers: headers,
      method: method,
      url: url,
      body: body
    };

    //Send back result of twitter.js here
    response.end(twitterCats.countTweets);
  });
}).listen(8080);