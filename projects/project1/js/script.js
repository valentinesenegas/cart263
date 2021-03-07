"use strict";

/**
The Platform
Valentine Sénégas

This is a game inspired by the movie The Platform directed by Galder Gaztelu-Urrutia.
*/

let gameStarted = false;

// Preload the main character, the enemies, the scene and the food on the platform.
function preload() {
  preloadCharacter();
  preloadEnemies();
  preloadFontsSounds();
  preloadFood();
  preloadHome();
}


//*********************************************************************
//                                                                   //
//                           S E T U P                               //
//                                                                   //
//*********************************************************************

// Setup the scene and the game in general.
function setup() {
  setupScene();
  setupGame();
  setupLevel();
}


//*********************************************************************
//                                                                   //
//                            D R A W                                //
//                                                                   //
//*********************************************************************

// Draw the scene, the main characters and the enemies.
function draw() {
  // Check if user has started the game.
  if (checkGameStarted() && gameStarted === false) {
      gameStarted = true;
      gameState = stateFloorEnter;
      playMusic();
  }

  // If the game has started, then check detect input and draw the game.
  if (gameStarted) {
    // Detect keyboard input from the user.
    detectKeyboardInput();
    drawGame();
  }
  // If game has not started, draw the home screen.
  else
    drawHome();
}
