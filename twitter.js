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
http.createServer(router).listen(9999);

console.log('Server running at localhost:9999');

// Callback function for failed API call
var error = function (err, response, body) {
  console.log('ERROR [%s]', err);
};

//Gets the users tweets
function countTweets (user, onDone) {
  var api = new Twitter.Twitter(creds.twitter);
  api.getUserTimeline({screen_name: user, count: '1000'}, error, function(data) {
    //Turns string returned from api into object
    var tweetObj = JSON.parse(data);
    //Turns that object into an array
    var tweetArray = Object.keys(tweetObj).map(function(k) { return tweetObj[k] });
    var count = catCount(tweetArray);

    //call function passed in with count as argument
    onDone(count);
  });
}

//Counts the number of tweets that have cat words in them
//argument is the array of usertweets
function catCount (tweets) {
  var num = tweets.map(getTweetContent).filter(getCatTweet).length;
  return num;
}

// function for map callback in catCount
// argument is individual tweet object in array of tweets
// returns the text property for the array object passed in
function getTweetContent (t){
  return t.text;
}

// function for filter callback in catCount
// returns true if array item passed in (tweet text) has a cat word in it
function getCatTweet (t) {
  var catWords = ['cat', 'kitten', 'kitty', 'kittens', '#cat', '#cats', '#kittens',
				  '#kitten', 'cats', 'meow', '#meow', '#kitty', 'cat.', 'Cat', 'Cats', 'cats.'];
  return RegExp(catWords.join("|")).test(t);
}

//export countTweets to be used in router
module.exports.countTweets = countTweets;
