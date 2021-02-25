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
}

function setupGame() {
  character = new Character(standing);
  food1 = new Food();

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
  drawSceneFoodCharacter();

  detectKeyboardInput();
  // Part 2: Draw enemies and floors. Detect collisions.
  if (enemy1 != null) {
    enemy1.drawCharacter();
    enemy1.goUpStart();
    enemy1.moveRight();
    floor1.goUpStart();
    let collisionEnemy1 = character.getRectangle().detectCollision(enemy1.getRectangle());
    console.log(collisionEnemy1);
  }

  if (enemy2 != null) {
    enemy2.drawCharacter();
    enemy2.goUpStart();
    enemy2.moveLeft();
    floor2.goUpStart();
    let collisionEnemy2 =character.getRectangle().detectCollision(enemy2.getRectangle());
    console.log(collisionEnemy2);
  }

  if (floor1 != null)
    floor1.draw();
  if (floor2 != null)
    floor2.draw();

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
function mousePressed() {
  levelPreparation();
}


function drawSceneFoodCharacter() {
  drawScene();

  food1.draw();

  // (let i = 0; i < numImgFood; i++) {
  //   food[i].draw();
  // }

  character.drawCharacter();
}


function levelPreparation() {
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

function levelReady() {
  // The levels are aligned with the platform.
  // Enemies start moving toward the platform.

}
