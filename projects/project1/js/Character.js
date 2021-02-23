// Main character

"use strict";

// The images are loaded in an array.
let imgCharacter = [];

//  Index of each state.
const standing = 0;
const fightLeft = 1;
const fightRight = 2;

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
    this.x = width/2;
    this.y = height/2;
  }

  // Displays the character
  drawCharacter() {
    push();
    imageMode(CENTER);
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

}
