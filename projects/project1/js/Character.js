// Main character

"use strict";

// The images are loaded in an array.
let imgCharacter = [];

//  Index of each state.
const standing = 0;
const fightLeft = 1;
const fightRight = 2;

let hit = false;

// Preload the images in the array
function preloadCharacter() {
  imgCharacter.push(loadImage("assets/images/character-1-standing.png"));
  imgCharacter.push(loadImage("assets/images/character-1-fight-left.png"));
  imgCharacter.push(loadImage("assets/images/character-1-fight-right.png"));
}

// Class for the character.
class Character {
  constructor(state) {
    this.state = state;
    this.x = width/2 - imgCharacter[0].width/2;
    this.y = height/2 - imgCharacter[0].height/2;
  }

  // Displays the character
  drawCharacter() {
    push();
    imageMode(CORNER);
    image(imgCharacter[this.state], this.x, this.y);
    pop();
  }

  setState(state) {
    this.state = state;
  }

  moveLeft() {
    this.x -= 3;
  }

  moveRight() {
    this.x += 3;
  }

  // Create a rectangle on top of the character to detect collisions.
  getRectangle() {
    fill('rgba(0,255,0, 0.25)');
    if (this.state == fightLeft)
      return new Rectangle(this.x, this.y + 220, 200,100);
    else if (this.state == fightRight)
      return new Rectangle(this.x, this.y + 220, 200,100);
    else
      return new Rectangle(this.x, this.y, 110,392);
  }
}
