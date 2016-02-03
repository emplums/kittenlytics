// var User = require('./user.js');
var displayer = require('./displayer.js');
var queryString = require('querystring');
var twitter = require('./twitter.js')
var commonHeader = {'Content-Type': 'text/html'}
var ecstatic = require('ecstatic');

var ecstaticHandler = ecstatic('./');

//Home Route
function home(request, response){
  if (request.url.match(/\/user\/.+/)) return results(request, response);
  if (request.url !== '/') return ecstaticHandler(request, response);
  if (request.method ==='POST') return handlePost(request, response);
  handleIndex(request, response);
}

function handleIndex (request, response) {
  response.writeHead(200, commonHeader);
  displayer.view('header', {}, response);
  displayer.view('form', {}, response);
  displayer.view('footer', {}, response);
  response.end();
}

function handlePost (request, response) {
  request.on('data', function(postBody){
  //Get username from form using querystring
  //you must do this because POST will return username='user'
  //instead of '/username'
    var query = queryString.parse(postBody.toString());

    //Redirect to results page
    response.writeHead(303, {'Location': '/user/' + query.username});
    response.end();
  });
}

function results(request, response) {
  //Get username from the url of the request
  var username = request.url.replace('/user/', "");
  //Get results by calling imported countTweets function
  twitter.countTweets(username, function(catCount) {
    var values = {
      username: username,
      tweetResults: catCount
    };

    if(username.length > 0) {
      response.writeHead(200, commonHeader);
      displayer.view('header', {}, response);
      displayer.view('stats', values, response);
      displayer.view('footer', {}, response);
      response.end();
    }
  });
}

module.exports = home;