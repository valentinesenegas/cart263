"use strict";

/**
Spy Profile Generator
Valentine Sénégas
*/

// Variables

let spyProfile = {
  name: `**REDACTED**`,
  alias: `**REDACTED**`,
  secretWeapon: `**REDACTED**`,
  password: `**REDACTED**`
}

let tarotData = undefined;
let objectData = undefined;
let instrumentData = undefined;

/**
Description of preload
*/
function preload() {
  tarotData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`);
  objectData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`);
  instrumentData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`);
}


/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  // Try to load the user data
  let data = JSON.parse(localStorage.getItem(`spy-profile-data`));

  if (data) {
    let password = prompt(`Agent! What is your password?`);

    if (password === data.password) {
      spyProfile.name = data.name;
      spyProfile.alias = data.alias;
      spyProfile.secretWeapon = data.secretWeapon;
      spyProfile.password = data.password;
    }
  } else {
    generateSpyProfile();
  }
}

function generateSpyProfile() {
  spyProfile.name = prompt(`Agent, what is your name?`);

  let instrument = random(instrumentData.instruments);
  spyProfile.alias = `The ${instrument}`;

  spyProfile.secretWeapon = random(objectData.objects);

  let card = random(tarotData.tarot_interpretations);
  spyProfile.password = random(card.keywords);

  localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile))
}

/**
Description of draw()
*/
function draw() {
  background(50);

  let profile = `SPY PROFILE!

  Name: ${spyProfile.name}
  Alias: ${spyProfile.alias}
  Secret Weapon: ${spyProfile.secretWeapon}
  Password: ${spyProfile.password}

  `;

  push();
  textSize(32);
  textFont(`Courier, Monospace`);
  textAlign(LEFT);
  text(profile, 100, 100);

  pop();
}
