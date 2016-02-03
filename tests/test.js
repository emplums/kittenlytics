var request = require('request');
var test = require('tape');

var Twitter = require('../lib/twitter');
var Router = require('../lib/router');
var Displayer = require('../lib/displayer');

test('Can tell between a non-cat tweet and a cat tweet', function(t) {
  t.plan(2);
  var nonCatTweet = "This is a very boring tweet.. #boring";
  var catTweet = "This is an awesome tweet because it contains cats.";

  t.equal(Twitter.getCatTweet(nonCatTweet), false);
  t.equal(Twitter.getCatTweet(catTweet), true);
});

test('Can count cat tweets', function(t) {
  t.plan(1);
  var nonCatTweet = "This is a very boring tweet.. #boring";
  var catTweet = "This is an awesome tweet because it contains cats.";
  var tweets = [
    { text: nonCatTweet },
    { text: catTweet }
  ];

  t.equal(Twitter.catCount(tweets), 1);
});
