"use strict";

/**
Where's Sausage Dog?
Valentine Sénégas
*/

// GLOBAL CONSTANTS AND VARIABLES
// Constants for image loading
const NUM_ANIMAL_IMAGES = 5;
const ANIMAL_IMAGE_PREFIX = `assets/images/person`;
const SAUSAGE_DOG_IMAGE = `assets/images/bernie.png`;

// Number of images to display
const NUM_ANIMALS = 80;

// Array of the loaded animal images
let animalImages = [];
// Array of animal objects
let animals = [];
// Loaded sausage dog image
let sausageDogImage;
// Sausage dog object
let sausageDog;

let wrong;


// ------------------ //


// Loads all the animal images and the sausage dog image
function preload() {
  // Loop once for each animal image, starting from 0
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    // Load the image with the current number (starting from 0)
    let animalImage = loadImage(`${ANIMAL_IMAGE_PREFIX}${i}.png`);
    // Add the image to the array for use later when randomly selecting
    animalImages.push(animalImage);
  }

  // Load the sausage dog image
  sausageDogImage = loadImage(`${SAUSAGE_DOG_IMAGE}`);

  // Load the sound of Donald Trump saying WRONG
   wrong = loadSound('assets/sounds/wrong.mp3');
}


// Creates all the animal objects and a sausage dog object
function setup() {
  createCanvas(windowWidth, windowHeight);

  createAnimals();
  createSausageDog();
}

// Creates all the animals at random positions with random animal images
function createAnimals() {
  // Create the correct number of animals
  for (let i = 0; i < NUM_ANIMALS; i++) {
    // Create one random animal
    let animal = createRandomAnimal();
    // Add it to the animals array
    animals.push(animal);
  }
}

// Create an animal object at a random position with a random image
// then return that created animal
function createRandomAnimal() {
  let x = random(0, width);
  let y = random(0, height);
  let animalImage = random(animalImages);
  let animal = new Animal(x, y, animalImage);
  return animal;
}

// Creates a sausage dog at a random position
function createSausageDog() {
  let x = random(0, width);
  let y = random(0, height);
  sausageDog = new SausageDog(x, y, sausageDogImage);
}

// Draws the background then updates all animals and the sausage dog
function draw() {
  background(255);

  updateAnimals();
  updateSausageDog();
}

// Calls the update() method for all animals
function updateAnimals() {
  // Loop through all animals
  for (let i = 0; i < animals.length; i++) {
    // Update the current animal
    animals[i].update();
  }
}

// Calls the update() method of the sausage dog
function updateSausageDog() {
  sausageDog.update();
}

// Automatically called by p5 when the mouse is pressed.
// Call the sausage dog's mousePressed() method so it knows
// the mouse was clicked.
function mousePressed() {
  sausageDog.mousePressed();
}
