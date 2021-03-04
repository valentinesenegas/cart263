"use strict";

/**
The Platform
Valentine Sénégas

This is a game inspired by the movie The Platform directed by Galder Gaztelu-Urrutia.
*/

// Variables
let character;
let food1;
let enemy1 = null;
let enemy2 = null;
let floor1;
let floor2;

// The state of the game.
let gameState;
// gameState possible values:
const stateFloorEnter = 0;
const stateFight = 1;
const stateFloorLeave = 2;
const stateWin = 3;
const stateLost = 4;
const stateHome = 5;
const stateInstructions = 6;

gameState = stateHome;

let level = 0;

// Used to know which side to attack depending on the last arrow key pressed.
let lastKeyPressedLeft = true;


// Preload the main character, the enemies, the scene and the food on the platform.
function preload() {
  preloadHome();

  preloadCharacter();
  preloadEnemies();
  preloadScene();
  preloadFood();
}


//*********************************************************************
//                                                                   //
//                           S E T U P                               //
//                                                                   //
//*********************************************************************

// Setup the scene and the game in general.
function setup() {
  
    setupScene();

  if (gameState != stateHome) {
    setupGame();
    setupLevel();
  }
}


//*********************************************************************
//                                                                   //
//                            D R A W                                //
//                                                                   //
//*********************************************************************

// Draw the scene, the main characters and the enemies.
function draw() {

  if (gameState === stateHome) {
    drawHome();
  } else {
    // Detect keyboard input from the user.
    detectKeyboardInput();
    drawGame();
  }
}
