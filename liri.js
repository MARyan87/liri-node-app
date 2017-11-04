var fs = require('fs');
var request = require('request');
var keys = require('./keys.js');
var Twitter = require('twitter');
var client = new Twitter(keys.twitterKeys);
var params = {
    screen_name: 'LiriLirison',
    count: 20
    };
var spotify = require('node-spotify-api');
var spotifyClient = new spotify ({
  id: '6d07e01e4a9441ad90e2b4deee3e77f7',
  secret: '5e06a076b0a24595a9c238491181ff49',
});
var omdb = require('omdb');
var arg = process.argv[2];
var arg2 = process.argv.splice(3).join(" ");

liri();

function liri() {



    if (arg === "my-tweets") {
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                console.log('');
                console.log('My Last 20 Tweets: ');
                console.log('--------------------------');
                tweets.forEach(function(individualTweet) {
                console.log('Time Posted: ' + individualTweet.created_at);
                console.log('Tweet: ' + individualTweet.text);
                console.log('--------------------------');
                });

            } else {
                console.log(error);
            };
        });


    } else if (arg === "spotify-this-song") {
        if (arg2.length < 1) {
            arg2 = "Ace of Base The Sign";
        };

    spotifyClient.search({ type: 'track', query: arg2 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
            console.log('');
            console.log('Spotify Song Information Results: ');
            console.log('--------------------------');
            console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
            console.log("Track Title: " + data.tracks.items[0].name);
            console.log("Link to Song: " + data.tracks.items[0].preview_url);
            console.log("Album Title: " + data.tracks.items[0].album.name);
            console.log('--------------------------');
        });


    } else if (arg === "movie-this") {
        if (arg2.length < 1) {
                arg2 = "Mr. Nobody";
        };

        request("http://www.omdbapi.com/?t=" + arg2 + "&y=&plot=short&r=json&tomatoes=true&apikey=40e9cece", function(error, response, body) {
            if (!error && response.statusCode === 200) {

                console.log('');
                console.log('OMDB Movie Information: ');
                console.log('--------------------------');
                console.log("Movie Title: " + JSON.parse(body).Title);
                console.log("Year of Release: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Countries produced in: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Movie Plot: " + JSON.parse(body).Plot);
                console.log("Actor(s): " + JSON.parse(body).Actors);
                console.log('--------------------------');
            } else {

                console.log(error);
            }
        });


    } else if (arg === "do-what-it-says") {

        fs.readFile('random.txt', 'utf8', function(err, data) {
            if (err) throw err;
            // console.log(data);

            var arr = data.split(',');

            arg = arr[0].trim();
            arg2 = arr[1].trim();
            liri();
        });
    }
};