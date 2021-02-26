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
const stateFloorEnter = 0;
const stateFight = 1;
const stateFloorLeave = 2;
let gameState;

let lastKeyPressedLeft = true;


// Preload the main character, the enemies, the scene and the food on the platform.
function preload() {
  preloadCharacter();
  preloadEnemies();
  preloadScene();
  preloadFood();
}


// Setup the scene and the game in general.
function setup() {
  setupScene();
  setupGame();
  setupLevel();
}

function setupGame() {
  character = new Character(standing);
  food1 = new Food();
  gameState = stateFloorEnter;

  // for (let i = 0; i < numImgFood; i++) {
  //   console.log("hehe");
  //   `food[${i}]`.new Food();
  //   // `food[${i}`].new Food();
  //     // imgFood.push(loadImage(`assets/images/food/food${i}.png`));
  // }
}


// Draw the scene, the main characters and the enemies.
function draw() {
  // Part 1: Draw the scene (platform), food and the character.
  detectKeyboardInput();

  drawScene();
  drawFloor();
  drawFood();
  drawEnemies();
  drawCharacter();
  drawHealth();
}


function detectKeyboardInput() {
  // Arrow keys: move left or right.
  if (keyIsDown(LEFT_ARROW)) {
    character.moveLeft();
    lastKeyPressedLeft = true;

  } else if (keyIsDown(RIGHT_ARROW)) {
    character.moveRight();
    lastKeyPressedLeft = false;
  } else {
    character.setState(standing);
  }

// Space bar: attack left or right depending on the last arrow key pressed.
  if (keyIsDown(32)) {
    if (lastKeyPressedLeft === true) {
      character.setState(fightLeft);
    }
    if (lastKeyPressedLeft === false) {
      character.setState(fightRight);
    }
  }
}


// ***** For test purposes only. Triggers the start of the level. ***
//function mousePressed() {
//  levelPreparation();
//}

function drawFood() {
  food1.draw();

  // (let i = 0; i < numImgFood; i++) {
  //   food[i].draw();
  // }

}

function drawCharacter() {
  character.drawCharacter();
}

// If the enemies are already created, draw them and animate them.
// Detect collisions.
function drawEnemies() {
  if (enemy1 != null) {
    if (gameState == stateFloorEnter)
      enemy1.goUpStart();
    else if (gameState == stateFight)
      enemy1.move();
    enemy1.drawCharacter();

    let collisionEnemy1 = character.getRectangle().detectCollision(enemy1.getRectangle());
    if (collisionEnemy1) {
      if (character.getState() == fightLeft)
      // Do something
      console.log(collisionEnemy1);
    }
  }

  if (enemy2 != null) {
    if (gameState == stateFloorEnter)
      enemy2.goUpStart();
    else if (gameState == stateFight)
      enemy2.move();
    enemy2.drawCharacter();

    let collisionEnemy2 =character.getRectangle().detectCollision(enemy2.getRectangle());

    if (collisionEnemy2) {
      if (character.getState() == fightRight)
      // Do something
      console.log(collisionEnemy2);
    }
  }
}


function drawFloor() {
  if (floor1.hasReachedFinalPosition() === false) {
    floor1.goUpStart();
  }

  if (floor2.hasReachedFinalPosition() === false) {
    floor2.goUpStart();
    if (floor1.hasReachedFinalPosition() === true &&
        floor2.hasReachedFinalPosition() === true)
          gameState = stateFight;
  }

  floor1.draw();
  floor2.draw();
}

function setupLevel() {
  // The floors appear from the bottom of the screen, one on the left, one on the right side.
  // There is an enemy on each floor.
  // Enemy Parameters: x, yFinal, index.
  enemy1 = new Enemy(100, 270, imgEnemy1[0]);
  enemy2 = new Enemy(width-150, 270, imgEnemy2[0]);

  // enemy1 = new Enemy(150, height/2, imgEnemy1[0]);
  // enemy2 = new Enemy(width-150, height/2, imgEnemy2[0]);

  floor1 = new Floor(0);
  floor2 = new Floor(900);
}
