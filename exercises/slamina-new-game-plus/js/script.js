"use strict";

/*****************
Slamina
Valentine Sénégas
A guessing game in which the page pronounces the name of a country
backwards and the user has to figure out what it was and say the
name forwards.
******************/

// An array of country names from
// https://github.com/dariusk/corpora/blob/master/data/geography/countries.json
const countries = [
  "afghanistan",
  "albania",
  "algeria",
  "andorra",
  "angola",
  "antigua & barbuda",
  "argentina",
  "armenia",
  "australia",
  "austria",
  "azerbaijan",
  "bahamas",
  "bahrain",
  "bangladesh",
  "barbados",
  "belarus",
  "belgium",
  "belize",
  "benin",
  "bhutan",
  "bolivia",
  "bosnia & herzegovina",
  "botswana",
  "brazil",
  "brunei",
  "bulgaria",
  "burkina Faso",
  "burundi",
  "cambodia",
  "cameroon",
  "canada",
  "cape verde",
  "central african republic",
  "chad",
  "chile",
  "china",
  "colombia",
  "comoros",
  "congo",
  "costa rica",
  "cote d'ivoire",
  "croatia",
  "cuba",
  "cyprus",
  "czech republic",
  "democratic republic of the congo",
  "denmark",
  "djibouti",
  "dominica",
  "dominican republic",
  "east timor",
  "ecuador",
  "egypt",
  "el salvador",
  "equatorial guinea",
  "eritrea",
  "estonia",
  "ethiopia",
  "fiji",
  "finland",
  "france",
  "gabon",
  "gambia",
  "georgia",
  "germany",
  "ghana",
  "greece",
  "grenada",
  "guatemala",
  "guinea",
  "guinea-bissau",
  "guyana",
  "haiti",
  "honduras",
  "hungary",
  "iceland",
  "india",
  "indonesia",
  "iran",
  "iraq",
  "ireland",
  "israel",
  "italy",
  "jamaica",
  "japan",
  "jordan",
  "kazakhstan",
  "kenya",
  "kiribati",
  "kosovo",
  "kuwait",
  "kyrgyzstan",
  "laos",
  "latvia",
  "lebanon",
  "lesotho",
  "liberia",
  "libya",
  "liechtenstein",
  "lithuania",
  "luxembourg",
  "madagascar",
  "malawi",
  "malaysia",
  "maldives",
  "mali",
  "malta",
  "marshall islands",
  "mauritania",
  "mauritius",
  "mexico",
  "micronesia",
  "moldova",
  "monaco",
  "mongolia",
  "montenegro",
  "morocco",
  "mozambique",
  "myanmar",
  "namibia",
  "nauru",
  "nepal",
  "new zealand",
  "nicaragua",
  "niger",
  "nigeria",
  "north korea",
  "north macedonia",
  "norway",
  "oman",
  "pakistan",
  "palau",
  "palestinian state",
  "panama",
  "papua new guinea",
  "paraguay",
  "peru",
  "poland",
  "portugal",
  "qatar",
  "romania",
  "russia",
  "rwanda",
  "samoa",
  "san marino",
  "sao tome & principe",
  "saudi arabia",
  "senegal",
  "serbia",
  "seychelles",
  "sierra leone",
  "singapore",
  "slovakia",
  "slovenia",
  "solomon islands",
  "somalia",
  "south africa",
  "south korea",
  "south sudan",
  "spain",
  "sri lanka",
  "st. kitts & nevis",
  "st. lucia",
  "st. vincent & The grenadines",
  "sudan",
  "suriname",
  "swaziland",
  "sweden",
  "switzerland",
  "syria",
  "taiwan",
  "tajikistan",
  "tanzania",
  "thailand",
  "the netherlands",
  "the philippines",
  "togo",
  "tonga",
  "trinidad & tobago",
  "tunisia",
  "turkey",
  "turkmenistan",
  "tuvalu",
  "uganda",
  "ukraine",
  "united arab emirates",
  "united kingdom",
  "united states of america",
  "uruguay",
  "uzbekistan",
  "vanuatu",
  "vatican city",
  "venezuela",
  "vietnam",
  "western sahara",
  "yemen",
  "zambia",
  "zimbabwe"
];

const QUESTION_DELAY = 2000; // in milliseconds

// The current answer to display (we use it initially to display the click instruction)
let currentAnswer = ``;
// The current country name the user is trying to guess
let currentCountry = ``;

let responsiveVoicePitch = 1;
let responsiveVoiceRate = 1;

let pitchChanged = false;
let rateChanged = false;

let feedback = false;

let gameStarted = false;

/**
Create a canvas
Set up annyang with the guessing command
Set text defaults
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  // Is annyang available?
  if (annyang) {
    // Create the guessing command
    let commands = {
      'The country is *country': guessCountry
    };
    // Setup annyang and start
    annyang.addCommands(commands);
    annyang.start();
  }

  // Text defaults
  textSize(102);
  textStyle(BOLD);
  textAlign(CENTER);
}


/**
Display the current answer.
 */
function draw() {
  background(0);

  displayAnswer();
}

/**
Display the current answer in red if incorrect and green if correct
(Displays nothing if no guess entered yet)
*/
function displayAnswer() {

  if (gameStarted && currentAnswer != ``) {
    if (currentAnswer === currentCountry) {

      correctGuess();

    } else {
      incorrectGuess();
    }

    text(currentAnswer, width / 2, height / 2);
  }
}

/**
Reverse the animal name and say it with ResponsiveVoice
*/
function sayCountryBackwards(country, pitch, rate) {
  let reverseCountry = reverseString(country);
  responsiveVoice.speak(reverseCountry, "UK English Female", {
    pitch: responsiveVoicePitch,
    rate: responsiveVoiceRate
  });
}

/**
Reverses the provided string
*/
function reverseString(string) {
  // Split the string into an array of characters
  let characters = string.split('');
  // Reverse the array of characters
  let reverseCharacters = characters.reverse();
  // Join the array of characters back into a string
  let result = reverseCharacters.join('');
  // Return the result
  return result;
}

/**
Called by annyang when the user make a guess.
animal parameter contains the guess as a string.
Sets the answer text to the guess.
*/
function guessCountry(country) {
  // Convert the guess to lowercase to match the answer format
  currentAnswer = country.toLowerCase();
}

/**
Reset the answer text, get a new random animal, say its name
*/
function nextQuestion() {
  currentAnswer = ``;
  currentCountry = random(countries);
  sayCountryBackwards(currentCountry);
}

/**
When the user clicks, go to the next question
*/
function mousePressed() {

  gameStarted = true;

  nextQuestion();

  resetVariables();
}

/**
Function that is called when the user guesses correctly.
Feedback from the responsive voice, increase of pitch and rate of the responsive voice.
*/
function correctGuess() {

  fill(0, 255, 0);

  if (!pitchChanged) {
    responsiveVoicePitch += 0.2;
    console.log(responsiveVoicePitch);
    pitchChanged = true;
  }

  if (!rateChanged) {
    responsiveVoiceRate += 0.2;
    console.log(responsiveVoiceRate);
    rateChanged = true;
  }

  if (!feedback) {
    responsiveVoice.speak("That is correct!", "UK English Female", {
      pitch: responsiveVoicePitch,
      rate: responsiveVoiceRate
    });
    feedback = true;
  }

}

function incorrectGuess() {

  fill(255, 0, 0);

  if (!feedback) {
    responsiveVoice.speak("You are a sad strange little man, and you have my pity.", "UK English Male", {
      pitch: 0.6,
      rate: 0.8
    });
    feedback = true;
  }
}


function resetVariables() {
  pitchChanged = false;
  rateChanged = false;
  feedback = false;
}
