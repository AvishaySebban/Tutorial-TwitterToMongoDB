Piping Twitter into MongoDB
===========================

# Background 

This tutorial created as part of a series of tutorials used in the graduate-
level seminar _Geography 597A: Visual Analytics &mdash; Leveraging GeoSocial 
Data_ at Penn State (held Fall 2013). These tutorials are designed to introduce 
students, with varying backgrounds, to the tools and skills employed in the 
collection, processing, and visualization of geographically attributed big data 
from social media outlets. 

This tutorial, the third in a series of four, covers the use of MongoDB as a 
datastore to hold the response to a request to the Twitter Streaming API. This 
tutorial uses [Node.js][nodejs] (a JavaScript-based application platform), 
[MongoDB][mongo] (a document-oriented database), and the 
[Twitter Streaming API][twitterapi] as the core technologies, though others may 
be used to produce the same result. 

### Goals

At the completion of this tutorial you will be able to:

* Install MongoDB on your system (OS X, Windows)
* Start a persistent MongoDB server
* Pipe Twitter API responses into MongoDB
* Create an index on target query fields

### Other Tutorials

* Building a Simple Twitter Scraper, by Sasha Savelyev
* Introduction to Leaflet: Visualizing Twitter Data, by Josh Stevens



# Prerequisites 

Before we begin, it's worth noting a few prerequisites. This tutorial assumes 
that you have the following skills, or completed the following tasks.

### Skills

* Some experience with the JavaScript programming language
* Some experience with databases (relational, document-driven, or otherwise)
* Some experience with a *nix terminal or the Microsoft Command Prompt

### Tasks

* (Optional) Installed [homebrew][homebrew] on your machine (OS X only)
* Installed Node.js on your personal machine ([downloads][installnodejs])
* Completed the demo "Building a Simple TWitter Scraper" (presented on 5 Sep 2013)
* [Downloaded][installmongo] the MongoDB installer (v2.4.6)



<!-- # Introducing MongoDB

## Installing MongoDB

## Using the Command Interface



# Upgrading the Scraper

## NPM Modules

## Integrating MongoDB into the Scraper

## Building Indices  -->

<!-- Hyperlinks -->

[homebrew]: http://brew.sh
[nodejs]: http://nodejs.org
[installnodejs]: http://nodejs.org/download/
[mongo]: http://mongodb.org
[installmongo]: http://www.mongodb.org/downloads
[installmongopm]: http://www.mongodb.org/downloads#packages
[twitterapi]: https://dev.twitter.com/docs/streaming-apis/streams/public
[simplescraper]: http://
[introleaflet]: http://