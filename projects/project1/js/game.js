"use strict";

// //////////////////////// //
// Variables and constants //
// ////////////////////// //

// The state of the game.
let gameState;
// gameState possible values:
const stateFloorEnter = 0;
const stateFight = 1;
const stateFloorLeave = 2;
const stateWin = 3;
const stateLost = 4;

// Level of the game, 0 means game not started.
let level = 0;
let levelMax = 10; // Level to reach to win the game.

let character;
let foods = [];
let enemy1 = null;
let enemy2 = null;
let floor1;
let floor2;

// Used to know which side to attack depending on the last arrow key pressed.
let lastKeyPressedLeft = false;
let lastKeyPressedRight = false;


//*********************************************************************
//                                                                   //
//                       S E T U P   G A M E                         //
//                                                                   //
//*********************************************************************

// Set up a new character and food on the platform.
function setupGame() {
  character = new Character(standing);

  let food;
  for (food = 0; food < character.getMaxHealth(); food++) {
    foods.push(new Food());
  }
}

// Set up the beginning of a level. Create new enemies and new floors.
function setupLevel() {

  level++;

  // The floors appear from the bottom of the screen, one on the left, one on the right side.
  // Enemy 1 is on the left side, Enemy 2 is on the right side.
  // Enemy Parameters: x, yFinal, index.
  enemy1 = new Enemy(100, 270, 0);
  enemy2 = new Enemy(width - 150, 270, 1);

  floor1 = new Floor(0);
  floor2 = new Floor(900);
}


//*********************************************************************
//                                                                   //
//                       D R A W    G A M E                          //
//                                                                   //
//*********************************************************************

function drawGame() {
  // Draw the scene (platform), the floors, the food, the enemies, the character and its health.
  drawScene();
  drawFloor();
  drawFood();
  if (gameState != stateWin)
    drawEnemies();
  drawCharacter();
  drawHealth();
  checkEndOfLevel();
  drawWin();
  drawLost();
}


// Detect keyboard input from the user.
function detectKeyboardInput() {
  // Arrow keys: move left or right.
  if (character.getState() === injured || gameState === stateLost)
    return;

  // Space bar: attack left or right depending on the last arrow key pressed.
  if (keyIsDown(32)) {
    if (lastKeyPressedLeft === true)
      character.setState(fightLeft);
    if (lastKeyPressedRight === true)
      character.setState(fightRight);
  }

  //  Determine direction based on last left/right arrow pressed.
  if (keyIsDown(LEFT_ARROW)) {
    if (character.getState() === fightRight)
      character.setState(standing);
    character.moveLeft();
    lastKeyPressedLeft = true;
    lastKeyPressedRight = false;
  } else if (keyIsDown(RIGHT_ARROW)) {
    if (character.getState() === fightLeft)
      character.setState(standing);
    character.moveRight();
    lastKeyPressedLeft = false;
    lastKeyPressedRight = true;
  } else
    character.setState(standing);
}


// Draw the food that is on the platform.
function drawFood() {
  let food;
  for (food = 0; food < character.getHealth(); food++)
    foods[food].draw();
}

// Draw the character.
function drawCharacter() {
  character.drawCharacter();
}

// If the enemies are already created, draw them and animate them.
// Detect collisions.
function drawEnemies() {

  // Enemy 1
  if (enemy1 != null) {
    if (gameState === stateFloorEnter)
      enemy1.goUpStart();
    else if (gameState === stateFight)
      enemy1.move(character.getState(), character.getX());
    enemy1.drawCharacter();

    let collisionEnemy1 = character.getRectangle().detectCollision(enemy1.getRectangle());
    if (collisionEnemy1) {
      if (enemy1.getState() === enemyFightingLeft || enemy1.getState() === enemyFightingRight) {
        character.hit();
        if (character.getHealth() === 0)
          gameState = stateLost;
      }
      if (character.getState() === fightLeft) {
        enemy1.exitLeft();
        playSoundPunch();
      } else if (character.getState() === fightRight) {
        enemy1.exitRight();
        playSoundPunch();
      }
    }
  }

  // Enemy 2
  if (enemy2 != null) {
    if (gameState === stateFloorEnter)
      enemy2.goUpStart();
    else if (gameState === stateFight)
      enemy2.move(character.getState(), character.getX());
    enemy2.drawCharacter();

    let collisionEnemy2 = character.getRectangle().detectCollision(enemy2.getRectangle());

    if (collisionEnemy2) {
      if (enemy2.getState() === enemyFightingLeft || enemy2.getState() === enemyFightingRight) {
        character.hit();
        if (character.getHealth() === 0)
          gameState = stateLost;
      }
      if (character.getState() === fightRight) {
        enemy2.exitRight();
        playSoundPunch();
      } else if (character.getState() === fightLeft) {
        enemy2.exitLeft();
        playSoundPunch();
      }
    }
  }
}

// Floors on each side of the screen.
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
  } else if (gameState === stateFloorLeave) {
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


function checkEndOfLevel() {

  if (level <= levelMax) {
    // When the two enemies have exited the screen, the floor leaves and new ones appear.
    if (gameState === stateFight && enemy1.getState() === enemyHasExited && enemy2.getState() === enemyHasExited)
      gameState = stateFloorLeave;
  } else {
    // When the user completes the last level, they win.
    character.setState(win);
    gameState = stateWin;
  }
}

// When the user wins.
function drawWin() {
  if (gameState != stateWin)
    return;

  // Main text.
  push();
  textSize(48);
  textFont(bigShouldersDisplay);
  textAlign(CENTER);
  fill('#000000');
  textLeading(28);
  text(`You won!`, width / 2, 110);
  pop();

  // Secondary text on the left.
  push();
  textSize(18);
  textAlign(CORNER, CENTER);
  fill('#000000');
  textLeading(22);
  text(`The current top-down hierarchy is harmful,   ` +
    `and it can easily be avoided if we distribute wisely ` +
    `and are satisfied with a reasonable  amount of food and wealth.`, 50, 100, 385, 500);
  pop();

  // Big text at the bottom.
  push();
  textSize(34);
  textAlign(CENTER, CENTER);
  textLeading(35);
  fill('#000000');
  text(`When resources are shared equally,\n
    there is more than enough for everybody.`, width / 2, 750);
  pop();
}

// When the user loses.
function drawLost() {
  if (gameState != stateLost)
    return;

  // Main text.
  push();
  textSize(48);
  textFont(bigShouldersDisplay);
  textAlign(CENTER);
  fill('#000000');
  textLeading(28);
  text(`You lost...`, width / 2, 110);
  pop();

  // Big text at the bottom.
  push();
  textSize(34);
  textAlign(CENTER, CENTER);
  textLeading(35);
  fill('#000000');
  text(`The food did not reach the lowest level...`, width / 2, 750);
  pop();
}

// ////////////////  //
// Music and sounds //
// //////////////  //

function playMusic() {
  if (music.isPlaying())
    music.stop();
  else
    music.play();
}

function playSoundPunch() {
  if (gameState != stateWin && gameState != stateLost) {
    if (soundPunch.isPlaying())
      soundPunch.stop();
    else
      soundPunch.play();
  }
}
