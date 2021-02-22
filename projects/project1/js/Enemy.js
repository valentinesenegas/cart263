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

// let imgEnemy1Standing;
// let imgEnemy1FightLeft;
// let imgEnemy1FightRight;
//
// let imgEnemy2Standing;
// let imgEnemy2FightLeft;
// let imgEnemy2FightRight;

// Preload the images
function preloadEnemies() {
  imgEnemy1.push(loadImage("assets/images/enemy-1-standing.png"));
  imgEnemy1.push(loadImage("assets/images/enemy-1-fight-left.png"));
  imgEnemy1.push(loadImage("assets/images/enemy-1-fight-right.png"));

  imgEnemy2.push(loadImage("assets/images/enemy-2-standing.png"));
  imgEnemy2.push(loadImage("assets/images/enemy-2-fight-left.png"));
  imgEnemy2.push(loadImage("assets/images/enemy-2-fight-right.png"));
  //
  // imgEnemy2Standing = loadImage("assets/images/enemy-2-standing.png");
  // imgEnemy2FightLeft = loadImage("assets/images/enemy-2-fight-left.png");
  // imgEnemy2FightRight = loadImage("assets/images/enemy-2-fight-right.png");
}


class Enemy {
  constructor(x, yFinal, index) {
    this.x = x;
    this.y = height + 250;
    this.yFinal = yFinal;
    this.index = index;
    this.speedX = 3;
    this.speedY = 6;
  }

  drawCharacter() {
    push();
    imageMode(CENTER);
    image(this.index, this.x, this.y);
    pop();
  }

  // Character on the left moves toward the platform.
  moveRight() {
    if (this.y === 448 && this.x < 500)
      this.x += this.speedX;

  }

  // Character on the right moves toward the platform.
  moveLeft() {
    if (this.y === 448 && this.x > 800)
      this.x -= this.speedX;
  }

  // Character moves up along with the floor.
  goUpStart() {
    if (this.y > this.yFinal) {
      this.y -= this.speedY;
    }
  }

}
