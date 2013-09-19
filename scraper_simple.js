// ---- Module Imports ----

var http  = require('https');
var fs    = require('fs');
var OAuth = require('oauth').OAuth;

// ---- Processing Functions ----

var firstTweet = true;

function processResponseData(data) {
    var tweet = data.toString();
    var parsedTweet = JSON.parse(tweet);

    if (firstTweet) {
        console.log(tweet);
        firstTweet = false;
    } else {
        console.log(",\n");
        console.log(tweet);
    }
}

// ---- Connecting to Twitter ----

var oa = new OAuth("https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token", 
    "CK-000xxx",
    "CS-000xxx",
    "1.0A", 
    "http://www.geovista.psu.edu/SensePlace2/", 
    "HMAC-SHA1"
);

var request = oa.get("https://stream.twitter.com/1.1/statuses/filter.json?locations=-77.9,40.7,-77.8,40.8",
    "AT-000xxx",
    "AS-000xxx"
);

request
    .addListener('response', function (response) {
        response.on('data', processResponseData);
    })
    .end();