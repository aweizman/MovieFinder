'use strict';
const Alexa = require('alexa-sdk');
const APP_ID = undefined;

const SKILL_NAME = 'Movie Match';
const HELP_MESSAGE = 'You can say give me an action movie. You can also ask for comedy, drama, and horror or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'You can say give me a comedy movie. You can also say - give me a horror movie. What would you like?';
const STOP_MESSAGE = 'Okay. See you soon.';
// imdb categories listed here for movies. Move movies and tvs to database.
var movies = {
    "action":[
        {"title":"The Dark Knight","year":"2008","summary":"superhero film directed, produced, and co-written by Christopher Nolan. Featuring the DC Comics character Batman, the film is the second part of Nolan's The Dark Knight Trilogy and a sequel to 2005's Batman Begins."},
        {"title":"Die Hard","year":"1988","summary":"American action film directed by John McTiernan. It follows off-duty New York City Police Department officer John McClane (Bruce Willis) who is caught in a Los Angeles skyscraper during a Christmas Eve heist."},
        {"title":"The Terminator","year":"1984","summary":"American science-fiction action film directed by James Cameron. It stars Arnold Schwarzenegger as the Terminator, a cyborg assassin sent back in time from 2029 to 1984."}
    ],
    "comedy":[
        {"title":"The Hangover","year":"2009","summary":"American comedy film directed by Todd Phillips, co-produced with Daniel Goldberg, and written by Jon Lucas and Scott Moore. It is the first installment in The Hangover trilogy."},
        {"title":"The Mask","year":"1994","summary":"American superhero comedy film directed by Charles Russell, produced by Bob Engelman, and written by Mike Werb, based on the comic series of the same name published by Dark Horse Comics."},
        {"title":"Dumb and Dumber","year":"1994","summary":"an American comedy road film starring Jim Carrey and Jeff Daniels. The film tells the story of Lloyd Christmas and Harry Dunne, two unintelligent but well-meaning friends from Providence, Rhode Island."}
    ],
    "superhero":[
        {"title":"Joker","year":"2019","summary":'In Gotham City, mentally-troubled comedian Arthur Fleck embarks on a downward-spiral of social revolution and bloody crime. This path brings him face-to-face with his infamous alter-ego: "The Joker"'}
    ],
  	"action-comedy":[],
  	"comedy-romance":[],
  	"fantasy":[],
  	"adventure":[],
  	"animation":[],
  	"crime":[],
  	"mystery":[],
  	"thriller":[],
  	"romance":[],
  	"sci-fi":[],
  	"drama":[],
  	"horror":[]
};

// imdb categories listed here for tv. 
//note that year is replaced with years, and input is string to account for multiple years of a show running
var tvs = {
    "action":[],
    "comedy":[
        {"title":"South Park","years":"1997-present","summary":"Follows the misadventures of four irreverent grade-schoolers in the quiet, dysfunctional town of South Park, Colorado."}
        ],
  	"superhero":[],
  	"action-comedy":[],
  	"comedy-romance":[],
  	"fantasy":[],
  	"adventure":[],
  	"animation":[],
  	"crime":[],
  	"mystery":[],
  	"thriller":[],
  	"romance":[],
  	"sci-fi":[],
  	"drama":[],
  	"horror":[]
      
}

const handlers = {
    'LaunchRequest': function () {
        const speechOutput = `Hello, and welcome to Movie Match. ${HELP_MESSAGE}`;
        this.response.speak(speechOutput).listen(HELP_REPROMPT)
        this.emit(':responseReady');
    },
      'FindMovieByGenreIntent': function (){
        // console.log("the request JSON begins here")
        

        const genreRequested = this.event.request.intent.slots.genre.value;
        
// Find the synonym that the user used, and assign it to videoTypeRequested
        const videoTypeRequested = this.event.request.intent.slots.type.value;
        const genreSlotStatus = this.event.request.intent.slots.genre.resolutions.resolutionsPerAuthority[0].status.code;

// Find the status code of the slot videoType, and assign it to videoTypeSlotStatus
				const videoTypeSlotStatus = this.event.request.intent.slots.type.resolutions.resolutionsPerAuthority[0].status.code;
        
        if (genreSlotStatus == 'ER_SUCCESS_NO_MATCH'){
            console.log('NO SYNONYM MATCHED');
            this.response.speak(`Sorry, I can't find any ${genreRequested} movies`);
            this.emit(':responseReady');
        }
        else{
            console.log('SYNONYM MATCHED');
            const genreResolvedTo = this.event.request.intent.slots.genre.resolutions.resolutionsPerAuthority[0].values[0].value.name;
            
// Find the value the slot video_type was resolved to, and assign it to videoTypeResolvedTo
            const videoTypeResolvedTo = this.event.request.intent.slots.type.resolutions.resolutionsPerAuthority[0].values[0].value.name;
          
            const video = randomPick(eval(videoTypeResolvedTo)[genreResolvedTo]);
            const videoTitle = video.title;
            const videoYear = video.year;
            const videoDescription = video.description;
        
            const speechOutput = `Here's your ${genreRequested} ${videoTypeRequested}: ${video.title} is a ${video.year} ${video.description}`;
            this.response.speak(speechOutput);
            this.emit(':responseReady');
        }

        
      },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

function randomPick(arr) {
    let i = 0;
    i = Math.floor(Math.random() * arr.length);
    return(arr[i]);
    }

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
