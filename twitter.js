//Read & Write node module
var fs = require('fs');

//Twitter JS client node module
var Twitter = require('twitter-js-client');

//API Credentials file
var creds = JSON.parse(fs.readFileSync('creds.json'));

// Callback function for failed API call
var error = function (err, response, body) {
	console.log('ERROR [%s]', err);
};

//Callback function for successfull API call
var success = function(data) {
	var tweetObj = JSON.parse(data);
	var tweetArray = Object.keys(tweetObj).map(function(k) { return tweetObj[k] });
	catCount(tweetArray);
}

//Gets the users tweets
function getTweets(user) {
	var api = new Twitter.Twitter(creds.twitter);
	api.getUserTimeline({screen_name: user, count: '200'}, error, success);
	
}

//Counts the number of tweets that have cat words in them
function catCount (tweets) {
	var num = tweets.map(getTweetContent).filter(getCatTweet).length;
	console.log("number of cat tweets",num);
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

getTweets('emplums');

