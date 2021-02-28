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

let level = 0;

let lastKeyPressedLeft = true;


// Preload the main character, the enemies, the scene and the food on the platform.
function preload() {
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

// Set up the beginning of a level. Create new enemies and new floors.
function setupLevel() {
  level++;

  // The floors appear from the bottom of the screen, one on the left, one on the right side.
  // Enemy 1 is on the left side, Enemy 2 is on the right side.
  // Enemy Parameters: x, yFinal, index.
  enemy1 = new Enemy(100, 270, 0);
  enemy2 = new Enemy(width-150, 270, 1);

  floor1 = new Floor(0);
  floor2 = new Floor(900);
}


function checkEndOfLevel() {
  // When the two enemies have exited the screen, the floor leaves and new ones appear.
  if (gameState == stateFight && enemy1.getState() === enemyHasExited && enemy2.getState() === enemyHasExited)
    gameState = stateFloorLeave;
}



//*********************************************************************
//                                                                   //
//                            D R A W                                //
//                                                                   //
//*********************************************************************

// Draw the scene, the main characters and the enemies.
function draw() {
  // Detect keyboard input from the user.
  detectKeyboardInput();

  // Draw the scene (platform), the floors, the food, the enemies, the character and its health.
  drawScene();
  drawFloor();
  drawFood();
  drawEnemies();
  drawCharacter();
  drawHealth();
  checkEndOfLevel();
}


function detectKeyboardInput() {
  // Arrow keys: move left or right.
  if (character.getState() == injured)
    return;

  if (keyIsDown(LEFT_ARROW)) {
    character.moveLeft();
    lastKeyPressedLeft = true;

  } else if (keyIsDown(RIGHT_ARROW)) {
    character.moveRight();
    lastKeyPressedLeft = false;
  } else
      character.setState(standing);

  // Space bar: attack left or right depending on the last arrow key pressed.
  if (keyIsDown(32)) {
    if (lastKeyPressedLeft === true) {
      character.setState(fightLeft);
    }
    if (lastKeyPressedLeft === false) {
      character.setState(fightRight);
    }
  }
  else if (keyIsPressed && keyCode === 32)
    character.setState(standing);
}

// Draw the food that is on the platform.
function drawFood() {
  food1.draw();

  // (let i = 0; i < numImgFood; i++) {
  //   food[i].draw();
  // }
}

// Draw the character
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
      enemy1.move(character.getState(), character.getX());
    enemy1.drawCharacter();

    let collisionEnemy1 = character.getRectangle().detectCollision(enemy1.getRectangle());
    if (collisionEnemy1) {
      if (enemy1.getState() == enemyFightingLeft || enemy1.getState() == enemyFightingRight)
        character.hit();
      if (character.getState() == fightLeft)
        enemy1.exitLeft();
      else if (character.getState() == fightRight)
        enemy1.exitRight();
    }
  }

  if (enemy2 != null) {
    if (gameState == stateFloorEnter)
      enemy2.goUpStart();
    else if (gameState == stateFight)
      enemy2.move(character.getState(), character.getX());
    enemy2.drawCharacter();

    let collisionEnemy2 =character.getRectangle().detectCollision(enemy2.getRectangle());

    if (collisionEnemy2) {
      if (enemy2.getState() == enemyFightingLeft || enemy2.getState() == enemyFightingRight)
        character.hit();
      if (character.getState() == fightRight)
        enemy2.exitRight();
      else if (character.getState() == fightLeft)
        enemy2.exitLeft();
    }
  }
}


function drawFloor() {
  if (gameState === stateFloorEnter) {
    if (floor1.hasReachedStartPosition() === false) {
      floor1.goUpStart();
    }

    if (floor2.hasReachedStartPosition() === false) {
      floor2.goUpStart();
      if (floor1.hasReachedStartPosition() === true &&
          floor2.hasReachedStartPosition() === true)
            gameState = stateFight;
    }
  }
  else if (gameState === stateFloorLeave) {
    if (floor1.hasReachedEndPosition() === false) {
      floor1.goUpEnd();
    }

    if (floor2.hasReachedEndPosition() === false) {
      floor2.goUpEnd();
      if (floor1.hasReachedEndPosition() === true &&
          floor2.hasReachedEndPosition() === true) {
            setupLevel();
            gameState = stateFloorEnter;
      }
    }
  }

  floor1.draw();
  floor2.draw();
}
