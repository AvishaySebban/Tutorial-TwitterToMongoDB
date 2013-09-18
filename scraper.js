// ----------------------------------------------------------------------------
// Tutorial:    Piping Twitter Streaming API into MongoDB
// Creator:     Ryan S Mullins (RyanMullins@psu.edu)
// Course:      Geography 597A - Visual Analytics Seminar
// Semester:    Spring 2013
// Date:        19 Sep 2013
// License:     
// Desc:        
// 
//      This code demonstrates how to scrape the results of an HTTP GET request
//      to the Twitter Streaming API, and store them in a MongoDB database 
//      using Node.js as the scraper platform.
// 
//      This code functional save four variables that must be changed to access
//      the Twitter authentication service and Streaming API. These four 
//      variables are listed below (including dummy names), and can be acquired
//      from the Twitter Developers page (http://dev.twitter.com).
//          * Consumer Key          (CK-000xxx)
//          * Consumer Secret       (CS-000xxx)
//          * Access Token          (AT-000xxx)
//          * Access Token Secret   (AS-000xxx)
// 
//      Special thanks to Sasha Savelyev for developing the initial Twitter
//      scraper tutorial that served as the basis for this demo.
// ----------------------------------------------------------------------------

// ---- Module Imports ----

var http = require('https');            // Secure HTTP
var fs = require('fs');                 // File system 
var oAuth = require('oauth').OAuth;     // OAuth 
var mongo = require('mongodb');         // MongoDB Driver

// ---- Connection to MongoDB Server and Database ----

var mdbServer = mongo.Server('localhost', 27017, {'auto_reconnect' : true});
var mdb = mongo.Db('streaming_db', mdbServer);

// ---- Connecting Database and Streaming API ----

mdb.open(function (err, db) {

    // Attempt to open a connection to database, log message if the connection 
    // has been established.

    if (!err) { console.log('Connected to streaming_db@localhost:27017'); }

    // Create and connect to collection in the database. If a collection with
    // that name already exists it will be returned, as-is, to the callback
    // function for further updates/inserts/removals.

    db.createCollection('tweets', function (err, collection) {

        // Counter to monitor number of tweets in database;

        var tweetCount = 0;

        // Function:    Process Response Data
        // Parameters:
        //              data - JSON data returned by Twitter API
        // 
        // This function: 
        //      (1) takes input in the form of an object returned in response
        //      to a request to the Twitter API (a binary encoded text string); 
        //      (2) coverts this response into a JavaScript Object by 
        //      converting it to a JavaScript String and parsing it using the 
        //      JSON.parse() function;
        //      (3) inserts the parsed object into the 'tweets' collection

        var processResponseData = function (data) {

            // Try-Catch block used to detect errors in parsing the response 
            // from Twitter, any data that cannot be parsed is discarded.

            try {

                // For the purposes of this tutorial, the total size of the 
                // database is limited to 1,000,000 tweets using this if-else 
                // statement. Remove these conditionals, leaving only the body 
                // of the if block, to add an unlimited number of tweets to the
                // database.

                if (tweetCount < 1000000){

                    // Parsing the response from Twitter into a JavaScript 
                    // Object.

                    var parsedTweet = JSON.parse(data.toString());
        
                    // Checking to ensure that the parsed tweet object has a 
                    // unique identifier that can be used in the collection.

                    if (parsedTweet.id && parsedTweet.id_str) {

                        // Formatting the parsed Tweet to use the unique 
                        // identifier structure required by MongoDB (object
                        // must have member '_id').

                        parsedTweet._id = new mongo.Long.fromString(parsedTweet.id_str, 10);
                        
                        // Inserting the tweet into the collection. If an error
                        // occurs while inserting it is almost certainly from a
                        // duplicate primary key, in which case the failure to 
                        // insert the tweet is ignored because it already 
                        // exists in the collection.

                        collection.insert(parsedTweet, function (err, doc) {
                            console.log("Error writing document to database. Most likely a duplicate.");
                        });

                        // Incrementing the counter variable

                        tweetCount++;
                    }
                } else { 

                    // Maximum number of tweets in the collection has been 
                    // reached, closing the connection and exiting the 
                    // Node.js process with status 0 (success).

                    db.close();
                    process.exit(0); 
                }
            } catch (e) {
                console.log("Exception thrown: " + e.message);
            }
        };

        // Creating a new OAuth object. This object has the ability to: 
        //      * request and store authentication credentials;
        //      * make HTTP requests to web services using those credentials;
        //      * add callbacks to handle the response from these requests.

        var oa = new oAuth(
            "https://api.twitter.com/oauth/request_token",
            "https://api.twitter.com/oauth/access_token",
            "CK-000xxx",
            "CS-000xxx",
            "1.0A",
            "http://demos.ryanmullins.org/streamToMongoDB",
            "HMAC-SHA1"
        );

        // Creating an HTTP GET request to the Twitter Streaming API 'filter'
        // method, limiting the area of interest to the southern portion of
        // Centre County, PA

        var request = oa.get(
            "https://stream.twitter.com/1.1/statuses/filter.json?locations=-77.9,40.7,-77.8,40.8",
            "AT-000xxx",
            "AS-000xxx"
        );

        // Adding a callback function to handle responses to the request, and 
        // issuing said request to the Twitter API (call to .end() method).

        request
            .addListener('response', function (response) {
                response.on('data', processResponseData);
            })
            .end();
    });
});
