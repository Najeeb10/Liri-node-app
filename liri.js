require("dotenv").config();
var keys = require("./keys.js");
console.log(keys.spotify);


var Twitter = require('twitter');
var userInput = process.argv[2]
 
 console.log(process.argv);

var client = new Twitter({
  consumer_key: keys.twitter.consumer_key,
  consumer_secret: keys.twitter.consumer_secret,
  access_token_key: keys.twitter.access_token_key,
  access_token_secret: keys.twitter.access_token_secret
});
 
 if (userInput === "mytweets"){
var params = {screen_name: 'SMUcoder'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) { 
  	for(var i = 0; i< tweets.length; i++ ){console.log(tweets[i].text) }

  }
saves();
});
 
}

var Spotify = require('node-spotify-api');
var userInput =process.argv[2];

 
var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});
 

 if (userInput === "spotify-this-song"){ 
spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data.tracks.items[0]); 
saves();
});
}

function saves(){
  var fs = require("fs")
  if (process.argv[3]){
  var insertText = process.argv[2] + " , " + process.argv[3] + "\n" 
  }else{
    var insertText =process.argv[2] + " \n "
  }
  fs.appendFile("log.txt", insertText , function(err,data){
    if(err){
      return console.log(err);
    }
  });
}

var request = require('request');
if( userInput === "movie-this"){

request('http://www.omdbapi.com/?i=tt3896198&apikey=942d932', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
  var body = JSON.parse(body);
  console.log(body)
  saves();

});
}