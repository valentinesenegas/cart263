"use strict";

/**
The Platform
Valentine Sénégas

This is a game inspired by the movie The Platform directed by Galder Gaztelu-Urrutia.
*/

let character;

const standing = 0;
const fightLeft = 1;
const fightRight = 2;
let characterState = standing;


/**
Description of preload
*/
function preload() {
  preloadCharacter();
  preloadScene();
}


/**
Description of setup
*/
function setup() {
  setupScene();
}


/**
Description of draw()
*/
function draw() {

  drawScene();

  // Draw the main character.
  character = new Character();

  if (characterState === fightLeft) {
    character.drawCharacterFightLeft();
  } else if (characterState === fightRight) {
    character.drawCharacterFightRight();
  }

  else {
    character.drawCharacter();
  }


}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    characterState = fightLeft;
  } else if (keyCode === RIGHT_ARROW) {
    characterState = fightRight;
  } else {
    characterState = standing;
  }
}
