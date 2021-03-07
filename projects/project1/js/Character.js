// Main character

"use strict";

// The images are loaded in an array.
let imgCharacter = [];

//  Index of each state.
const standing = 0;
const fightLeft = 1;
const fightRight = 2;
const injured = 3;
const win = 4;

const normalSpeed = 3;
const fightSpeed = 8;
const maxHealth = 10;

let hit = false;

// Preload the images in the array
function preloadCharacter() {
  imgCharacter.push(loadImage("assets/images/character-1-standing.png"));
  imgCharacter.push(loadImage("assets/images/character-1-fight-left.png"));
  imgCharacter.push(loadImage("assets/images/character-1-fight-right.png"));
  imgCharacter.push(loadImage("assets/images/character-1-injured.png"));
  imgCharacter.push(loadImage("assets/images/character-1-happy.png"));
}

// Class for the character.
class Character {
  constructor(state) {
    this.state = state;
    this.x = width/2 - imgCharacter[0].width/2;
    this.y = height/2 - imgCharacter[0].height/2;
    this.health = maxHealth;
    this.timeoutInjured = 0;
  }

  // Displays the character
  drawCharacter() {
    push();
    imageMode(CORNER);
    image(imgCharacter[this.state], this.x, this.y);
    pop();
    if (this.timeoutInjured != 0) {
      this.timeoutInjured--;
      if (this.timeoutInjured == 0)
        this.state = standing;
    }

    // Don't let the character go out of the screen.
    if (this.x <= 0) {
      this.x = 0;
    }
    if (this.x >= width - imgCharacter[this.state].width) {
      this.x = width - imgCharacter[this.state].width;
    }
  }

  setState(state) {
    this.state = state;
  }


  getState() {
    return this.state;
  }

  moveLeft() {
    this.x -= (this.state === standing) ? normalSpeed : fightSpeed;
  }

  moveRight() {
    this.x += (this.state === standing) ? normalSpeed : fightSpeed;
  }

  getX() {
    return this.x;
  }

  // Create a rectangle on top of the character to detect collisions.
  getRectangle() {
    // fill('rgba(0,255,0, 0.25)'); Debug code, do not delete.
    if (this.state == fightLeft)
      return new Rectangle(this.x, this.y + 220, 150, 60);
    else if (this.state == fightRight)
      return new Rectangle(this.x + 60, this.y + 220, 150, 60);
    else
      return new Rectangle(this.x, this.y, 110, 392); // Standing
  }

  // 0 means death.
  getHealth() {
    return this.health;
  }

  getMaxHealth() {
    return maxHealth;
  }

  // The character is hit by an enemy.
  hit() {
    if (this.state == injured)
      return;
    this.health--;
    this.state = injured;
    this.timeoutInjured = 50;
    // soundPunch.play();
    playSoundPunch();
  }

}

// Display the health of the main character.
function drawHealth() {
  if (gameState == stateWin || gameState == stateLost)
    return;

  let maxHealthWidth = 300;

  if (character.getHealth() >= 0) {
    // Draw the remaining health.
    push();
    noStroke();
    rectMode(CORNER);
    fill('rgba(0,255,0, 0.25)');
    rect(width/2 - maxHealthWidth/2, 140, (maxHealthWidth / character.getMaxHealth()) * character.getHealth(), 40, 4);
    pop();
  }

  // Stroke around the health. Does not change.
  push();
  stroke(100);
  strokeWeight(3);
  noFill();
  rectMode(CORNER);
  rect(width/2 - maxHealthWidth/2, 140, maxHealthWidth, 40, 4);
  pop();

  // Descriptive Text.
  push();
  textSize(16);
  textFont(lexendDeca);
  textAlign(CENTER);
  fill(79,79,79);
  text('Food left', width/2, 110);
  pop();
}
