"use strict";

/**
Where's Bernie?
Valentine Sénégas
*/

////////////////////////////////////////////////////////
// Note: I wrote persons instead of people for variables and functions because it makes it easier to change the text if needed. It might be irritating to read, I apologize in advance. ( ͡❛ ͜ʖ ͡❛)
////////////////////////////////////////////////////////


// GLOBAL CONSTANTS AND VARIABLES
// Constants for image loading
const NUM_PERSON_IMAGES = 5;
const PERSON_IMAGE_PREFIX = `assets/images/person`;
const BERNIE_IMAGE = `assets/images/bernie.png`;

// Number of images to display
const NUM_PERSONS = 80;

// Array of the loaded people's images
let personImages = [];
// Array of person objects
let persons = [];
// Loaded Bernie image
let bernieImage;
// Bernie object
let bernie;

// Background images
let backgroundImage1;
let backgroundImage2;

// Sounds
let wrong;
let yay;

// State of the game; can be `findBernie`, `title` or `ending`.
let state = `title`;

// ------------------ //


// Loads all the person images and the Bernie image
function preload() {
  // Loop once for each person image, starting from 0
  for (let i = 0; i < NUM_PERSON_IMAGES; i++) {
    // Load the image with the current number (starting from 0)
    let personImage = loadImage(`${PERSON_IMAGE_PREFIX}${i}.png`);
    // Add the image to the array for use later when randomly selecting
    personImages.push(personImage);
  }

  // Load the Bernie image
  bernieImage = loadImage(`${BERNIE_IMAGE}`);

  // Load the background images
  backgroundImage1 = loadImage(`assets/images/background1.jpg`);
  backgroundImage2 = loadImage(`assets/images/background2.jpg`);

  // Load the sound of Donald Trump saying WRONG
  wrong = loadSound('assets/sounds/wrong.mp3');
  // Load the sound of a voice saying yay
  yay = loadSound('assets/sounds/yay.wav');
}


// Creates all the person objects and a Bernie object
function setup() {
  createCanvas(windowWidth, windowHeight);

  // New characters are created.
  reset();

}

// ----------------- //
// CREATE CHARACTERS //

// Creates all the people at random positions with random person images
function createPersons() {
  // Create the correct number of people
  for (let i = 0; i < NUM_PERSONS; i++) {
    // Create one random person
    let person = createRandomPerson();
    // Add it to the people array
    persons.push(person);
  }
}

// Create a person object at a random position with a random image
// then return that created person
function createRandomPerson() {
  let x = random(0, width);
  let y = random(0, height);
  let personImage = random(personImages);
  let person = new Person(x, y, personImage);
  return person;
}

// Creates a Bernie at a random position
function createBernie() {
  let x = random(0, width);
  let y = random(0, height);
  bernie = new Bernie(x, y, bernieImage);
}

// ----------------- //
// UPDATE CHARACTERS //

// Calls the update() method for all people
function updatePersons() {
  // Loop through all people
  for (let i = 0; i < persons.length; i++) {
    // Update the current person
    persons[i].update();
  }
}

// Calls the update() method of Bernie
function updateBernie() {
  bernie.update();
}


// ---------------- //
// DRAW

// Draws the background then updates all people and Bernie
function draw() {
  background(backgroundImage1);

  if (state === `findBernie`) {
    findBernie();
  } else if (state === `title`) {
    title();
  } else if (state === `ending`) {
    ending();
  }
}

// ---------------- //
// STATES

// The actual game.
function findBernie() {
  updatePersons();
  updateBernie();
}

// Title page before the game starts.
function title() {
  push();
  textSize(64);
  fill(24, 24, 26);
  textAlign(CENTER, CENTER);
  text(`Find Bernie`, width / 2, height / 6);
  textSize(32);
  text(`Press any key to start`, width / 2, height / 4);
  pop();
}

// Appears when the player found Bernie.
function ending() {
  background(backgroundImage2);
  textSize(64);
  fill(255, 255, 255);
  textAlign(CENTER, CENTER);
  text(`You found Bernie!`, width / 2, height / 6);
  textSize(32);
  text(`Press any key to play again`, width / 2, height / 4);
  pop();
}

// Resets the characters when starting a new game.
function reset() {

// If the player was in the game and found Bernie, show the ending page.
  if (state === `findBernie`){
      state = `ending`;
  }

  createPersons();
  createBernie();
}


// Automatically called by p5 when the mouse is pressed.
// Call the Bernie's mousePressed() method so it knows
// the mouse was clicked.
function mousePressed() {
  if (state === `findBernie`) {
  bernie.mousePressed();
  }
}


// To start the game, press any key.
function keyPressed(){
  if (state === `title` || state === `ending`) {
    state = `findBernie`;
  }
}
