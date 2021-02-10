"use strict";

/**
Spy Profile Generator
Valentine Sénégas

Asks the user for their name and generates a spy profile for them! Uses
JSON data to create the profile. Generates a password and requires that
password to view the profile when the program is loaded again.
Uses:
Darius Kazemi's corpora project:
https://github.com/dariusk/corpora/
*/

///////////////////////////////

// Constants and variables

// URLs to JSON data
const TAROT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`;
const OBJECT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`;
const INSTRUMENT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`;
const CANNABIS_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/plants/cannabis.json`;
const STATES_OF_DRUNKENNESS = `https://raw.githubusercontent.com/dariusk/corpora/master/data/words/states_of_drunkenness.json`;
const SCIENTISTS = `https://raw.githubusercontent.com/dariusk/corpora/master/data/humans/scientists.json`

// The key used to save and load the data for this program
const PROFILE_DATA_KEY = `spy-profile-data`;

// The spy profile data while the program is running
let spyProfile = {
  name: `**REDACTED**`,
  alias: `**REDACTED**`,
  secretWeapon: `**REDACTED**`,
  password: `**REDACTED**`,
  currentMission: `**REDACTED**`,
  contactCode: `**REDACTED**`,
  emergencyContact: `**REDACTED**`
};
// Variables to store JSON data for generating the profile
let tarotData;
let objectsData;
let instrumentsData;
let cannabisData;
let statesOfDrunkennessData;
let scientistsData;

let imgBg;

///////////////////////////////

/**
Loads the JSON data used to generate the profile
*/
function preload() {
  tarotData = loadJSON(TAROT_DATA_URL);
  objectsData = loadJSON(OBJECT_DATA_URL);
  instrumentsData = loadJSON(INSTRUMENT_DATA_URL);
  cannabisData = loadJSON(CANNABIS_DATA_URL);
  statesOfDrunkennessData = loadJSON(STATES_OF_DRUNKENNESS);
  scientistsData = loadJSON(SCIENTISTS);

  imgBg = loadImage(`assets/images/imgBg.jpg`);
}

/**
Creates a canvas then handles loading profile data, checking password,
and generating a profile as necessary.
*/
function setup() {
  // Create the canvas
  createCanvas(windowWidth, windowHeight);
  // Try to load the data
  let data = JSON.parse(localStorage.getItem(PROFILE_DATA_KEY));
  // Check if there was data to load
  if (data) {
    // If so, ask for the password
    let password = prompt(`What's ya password?`);
    // Check if the password is correct
    if (password === data.password) {
      // If is is, then setup the spy profile with the data
      setupSpyProfile(data);
    }
  } else {
    // If there is no data, generate a spy profile for the user
    generateSpyProfile();
  }
}

/**
Assigns across the profile properties from the data to the current profile
*/
function setupSpyProfile(data) {
  spyProfile.name = data.name;
  spyProfile.alias = data.alias;
  spyProfile.secretWeapon = data.secretWeapon;
  spyProfile.password = data.password;
  spyProfile.currentMission = data.currentMission;
  spyProfile.contactCode = data.contactCode;
  spyProfile.emergencyContact = data.emergencyContact;
}

/**
Generates a spy profile from JSON data
*/
function generateSpyProfile() {
  // Ask for the user's name and store it
  spyProfile.name = prompt(`What's ya name?`);
  // Generate an alias from a random instrument
  spyProfile.alias = `The ${random(instrumentsData.instruments)}`;
  // Generate a secret weapon from a random object
  spyProfile.secretWeapon = random(objectsData.objects);
  // Generate a password from a random keyword for a random tarot card
  let card = random(tarotData.tarot_interpretations);
  spyProfile.password = random(card.keywords);

  spyProfile.currentMission = random(cannabisData.cannabis);

  spyProfile.contactCode = random(statesOfDrunkennessData.states_of_drunkenness);

  spyProfile.emergencyContact = random(scientistsData.scientists);

  // Save the resulting profile to local storage
  localStorage.setItem(PROFILE_DATA_KEY, JSON.stringify(spyProfile));
}

/**
Displays the current spy profile.
*/
function draw() {
  background(10);
  imageMode(LEFT, TOP);
  image(imgBg, 0, 0);

  // Display the profile
  push();
  textSize(32);
  textAlign(LEFT, TOP);
  textFont(`Bai Jamjuree, Courier, monospace`);

  // Title
  fill(0);
  text(`TOP SECRET SPY PROFILE`, 90, 138);

  fill(255);
  // Left part: name, alias, secret weapon, password
  text(spyProfile.name, 100, 258);
  text(spyProfile.alias, 100, 395);
  text(spyProfile.secretWeapon, 100, 532);
  text(spyProfile.password, 100, 669);

  // Right part: mission, secret phrase
  text(spyProfile.currentMission, 628, 648);
  text(spyProfile.contactCode, 628, 785);

  textSize(20);
  text(`In case of emergency, contact ${spyProfile.emergencyContact}.`, 980, 728);


  pop();
}


// Responsive voice reads the profile.
function readProfile() {

  let spyText = `TOP SECRET SPY PROFILE.
  Name: ${spyProfile.name}.
  Alias: ${spyProfile.alias}.
  Secret Weapon: ${spyProfile.secretWeapon}.
  Password: ${spyProfile.password}.
  Name of current mission: ${spyProfile.currentMission}.
  The code you need to say when you meet your contact: ${spyProfile.contactCode}.
  In case of emergency, contact: ${spyProfile.emergencyContact}. But seriously, I wouldn't count on that.
  Good luck on your mission, agent. Hasta la vista!`;

  responsiveVoice.speak(spyText, "UK English Female");
}

// User interaction when pressing keys.
function keyPressed() {
  console.log(localStorage);
  // N key to Generate a (N)ew profile
  if (key === 'n') {
    generateSpyProfile();
  }

  // R key to (R)ead the profile
  if (key === 'r') {
    readProfile();
  }
}
