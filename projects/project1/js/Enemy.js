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
  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.index = index;
  }

  drawCharacter() {
    push();
    imageMode(CENTER);
    image(this.index, this.x, this.y);
    pop();
  }
}
