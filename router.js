// var User = require('./user.js');
var displayer = require('./displayer.js');
var queryString = require('querystring');
var twitter = require('./twitter.js')
var commonHeader = {'Content-Type': 'text/html'}


//Home Route
function home(request, response){
	if(request.url === '/'){
		//Handle GET requests (display templates)
		if(request.method.toLowerCase() === 'get') {
			response.writeHead(200, commonHeader);
			displayer.view('header', {}, response);
			displayer.view('form', {}, response);
			displayer.view('footer', {}, response);
			response.end();
		} else {
			//Handle POST requests
			request.on('data', function(postBody){
				//Get username from form using querystring
				//you must do this because POST will return username='user'
				//instead of '/username'
				var query = queryString.parse(postBody.toString());
				var queryName = query.username;
				//Redirect to results page
				response.writeHead(303, {'Location': '/', queryName});
				response.end();
			});
		}
	}
}

function results(request, response) {
	//Get username from the url of the request
	var username = request.url.replace('/', "");
	if (username == "favicon.ico") {
		return;
	}

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

module.exports.home = home;
module.exports.results = results;