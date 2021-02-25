// Enemy

"use strict";

// The images are loaded in an array for each enemy.

let imgEnemy1 = [];
let imgEnemy2 = [];

let imgEnemies = [imgEnemy1, imgEnemy2];

//  Index of each state.
// const standing = 0;
// const fightLeft = 1;
// const fightRight = 2;
// crouchLeft = 3
// crouchRight = 4

// Preload the images
function preloadEnemies() {
  imgEnemy1.push(loadImage("assets/images/enemy-1-standing.png"));
  imgEnemy1.push(loadImage("assets/images/enemy-1-fight-left.png"));
  imgEnemy1.push(loadImage("assets/images/enemy-1-fight-right.png"));
  imgEnemy1.push(loadImage("assets/images/enemy-1-crouch-left.png"));
  imgEnemy1.push(loadImage("assets/images/enemy-1-crouch-right.png"));

  imgEnemy2.push(loadImage("assets/images/enemy-2-standing.png"));
  imgEnemy2.push(loadImage("assets/images/enemy-2-fight-left.png"));
  imgEnemy2.push(loadImage("assets/images/enemy-2-fight-right.png"));
  imgEnemy2.push(loadImage("assets/images/enemy-2-crouch-left.png"));
  imgEnemy2.push(loadImage("assets/images/enemy-2-crouch-right.png"));
}


class Enemy {
  constructor(x, yFinal, index) {
    this.x = x;
    this.y = height + 250;
    this.yFinal = yFinal;
    this.index = index;
    this.speedX = 3;
    this.speedY = 6;
    this.injured = false;
  }

  drawCharacter() {
    push();
    imageMode(CORNER);
    image(this.index, this.x, this.y);
    pop();
  }

  // Character on the right moves toward the platform.
  moveLeft() {
    if (this.y < 270 && this.x > 750)
      this.x -= this.speedX;
  }

  // Character on the left moves toward the platform.
  moveRight() {
    if (this.y < 270 && this.x < 430)
      this.x += this.speedX;

  }

  // Character moves up along with the floor.
  goUpStart() {
    if (this.y > this.yFinal) {
      this.y -= this.speedY;
    }
  }

  // Create a rectangle on top of the enemy to detect collisions.
  getRectangle() {
    fill('rgba(0,255,0, 0.25)');
    if (this.state == fightLeft)
      return new Rectangle(this.x, this.y, 200,100);
    else if (this.state == fightRight)
      return new Rectangle(this.x, this.y, 200,100);
    else
      return new Rectangle(this.x, this.y, 110,392);
  }

}
