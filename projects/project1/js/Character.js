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
  }

  // Displays the character
  drawCharacter() {
    push();
    imageMode(CENTER);
    image(imgCharacter[this.state], width/2, height/2);
    pop();
  }

  setState(state) {
    this.state = state;
  }

}
