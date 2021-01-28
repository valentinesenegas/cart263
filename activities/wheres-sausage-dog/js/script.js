"use strict";

/**
Where's Sausage Dog?
Valentine Sénégas
*/

// GLOBAL CONSTANTS AND VARIABLES
const NUM_ANIMAL_IMAGES = 10;
const PATH_ANIMAL_IMAGES = `assets/images/animal`;
const PATH_SAUSAGE_DOG_IMAGE = `assets/images/sausage-dog.png`;

const NUM_ANIMALS = 100;

let animalImages = [];
let animals = [];

let sausageDogImage;
let sausageDog;

/**
Preload the animal images.
*/
function preload() {
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    let animalImage = loadImage(PATH_ANIMAL_IMAGES + `${i}.png`);
    animalImages.push(animalImage);
  }

  sausageDogImage = loadImage(PATH_SAUSAGE_DOG_IMAGE);
}


/**
Create canvas, create the animals and sausage dog.
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  createAnimals();

  createSausageDog();
}


/**
Darw background.
*/
function draw() {
  background(255, 255, 0);

  updateAnimals();

  updateSausageDog();
}


function mousePressed() {
  sausageDog.mousePressed();
}

  // Update the animal array.
function updateAnimals() {
    for (let i = 0; i < animals.length; i++) {
      animals[i].update();
    }
}

  // Create animals.
function createAnimals() {
  for (let i = 0; i < NUM_ANIMALS; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let animalImage = random(animalImages);
    let animal = new Animal(x, y, animalImage);
    animals.push(animal);
  }
}


function createSausageDog() {
  let x = random(0, width);
  let y = random(0, height);
  sausageDog = new SausageDog(x, y, sausageDogImage);
}

function updateSausageDog() {
    sausageDog.update();
}
