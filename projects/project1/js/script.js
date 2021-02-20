"use strict";

/**
The Platform
Valentine Sénégas

This is a game inspired by the movie The Platform directed by Galder Gaztelu-Urrutia.
*/

let character;
let enemy1 = null;
let enemy2 = null;
let floor1;
let floor2;

/**
Description of preload
*/
function preload() {
  preloadCharacter();
  preloadEnemies();
  preloadScene();
}


/**
Description of setup
*/
function setup() {
  setupScene();
  setupGame();
}

function setupGame() {
  character = new Character(standing);
}

/**
Draw the scene, the main characters and the enemies.
*/
function draw() {

  drawScene();
  character.drawCharacter();
  if (enemy1 != null)
    enemy1.drawCharacter();
  if (enemy2 != null)
    enemy2.drawCharacter();
  if (floor1 != null)
    floor1.draw();
  if (floor2 != null)
    floor2.draw();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    character.setState(fightLeft);
  } else if (keyCode === RIGHT_ARROW) {
    character.setState(fightRight);
  } else {
    character.setState(standing);
  }
}

// ***** For test purposes only. Triggers the start of the level. ***
function mousePressed() {
  levelPreparation();
}


function levelPreparation() {
  // The floors appear from the bottom of the screen, one on the left, one on the right side.
  // There is an enemy on each floor.
  enemy1 = new Enemy(150, height/2, imgEnemy1[0]);
  enemy2 = new Enemy(width-150, height/2, imgEnemy2[0]);
  console.log(random(imgEnemies));

  floor1 = new Floor(0);
  floor2 = new Floor(900);
}

function levelReady() {
  // The levels are aligned with the platform.
  // Enemies start moving toward the platform.

}
