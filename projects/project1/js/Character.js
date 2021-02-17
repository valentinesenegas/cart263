// Main character

"use strict";

let imgCharacterStanding;
let imgCharacterFightLeft;
let imgCharacterFightRight;

// Preload the images
function preloadCharacter() {
  imgCharacterStanding = loadImage("assets/images/character-1-standing.png");
  imgCharacterFightLeft = loadImage("assets/images/character-1-fight-left.png");
  imgCharacterFightRight = loadImage("assets/images/character-1-fight-right.png");
}

// Class for the character.
class Character {
  constructor () {
    // this.image = keyboardControls;
    // console.log(this.image);
  }

  // Displays the character
  drawCharacter() {
    push();
    imageMode(CENTER);
    image(imgCharacterStanding, width/2, height/2);
    pop();
  }

  drawCharacterFightLeft() {
    push();
    imageMode(CENTER);
    image(imgCharacterFightLeft, width/2, height/2);
    pop();
  }

  drawCharacterFightRight() {
    push();
    imageMode(CENTER);
    image(imgCharacterFightRight, width/2, height/2);
    pop();
  }

}
