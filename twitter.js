//Read & Write node module
var fs = require('fs');

//Twitter JS client node module
var Twitter = require('twitter-js-client');

//API Credentials file
var creds = JSON.parse(fs.readFileSync('creds.json'));

//Http module
var http = require('http');

//Router
var router = require('./router');

//Create Web Server
http.createServer(function(request, response) {
  router.home(request, response);
  router.results(request, response);
}).listen(9999);
console.log('Server running at localhost:9999');

// Callback function for failed API call
var error = function (err, response, body) {
	console.log('ERROR [%s]', err);
};

//Callback function for successfull API call
var success = function(data) {
	//Turns string returned from api into object
	var tweetObj = JSON.parse(data);
	//Turns that object into an array
	var tweetArray = Object.keys(tweetObj).map(function(k) { return tweetObj[k] });
	return catCount(tweetArray);
}

//Gets the users tweets
function countTweets (user) {
	var api = new Twitter.Twitter(creds.twitter);
	api.getUserTimeline({screen_name: user, count: '1000'}, error, success);
	
}

//Counts the number of tweets that have cat words in them
function catCount (tweets) {
	var num = tweets.map(getTweetContent).filter(getCatTweet).length;
	return num;
}

// function for map callback in catCount
// returns the text property for the array object passed in
function getTweetContent (t){
	return t.text;
}

// function for filter callback in catCount
// returns true if array object (tweet text) has a cat word in it
function getCatTweet (t) {
	var catWords = ['cat', 'kitten', 'kitty', 'kittens', '#cat', '#cats', '#kittens',
					'#kitten', 'cats', 'meow', '#meow', '#kitty', 'cat.', 'Cat', 'Cats', 'cats.'];
	return RegExp(catWords.join("|")).test(t);
}

module.exports.countTweets = countTweets;
