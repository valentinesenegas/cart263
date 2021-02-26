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
const enemyStanding = 0;
const enemyFightingLeft = 1;
const enemyFightingRight = 2;
const enemyExitingLeft = 3;
const enemyExitingRight = 4;
const enemyHasExited = 5;

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
  constructor(x, yFinal, imagesIndex) {
    this.x = x;
    this.y = height;
    this.w = this.index
    this.yFinal = yFinal;
    this.images = imgEnemies[imagesIndex];
    this.speedX = 3;
    this.speedY = 8;
    this.state = enemyStanding;
    this.timeout = 0;
  }

  drawCharacter() {
    if (this.state == enemyHasExited)
      return;
    push();
    imageMode(CORNER);
    let img = this.images[0];
    if (this.state == enemyFightingLeft)
      img = this.images[1];
    else if (this.state == enemyFightingRight)
      img = this.images[2];
    image(img, this.x, this.y);
    pop();
  }

  move(characterX) {
    if (this.state == enemyHasExited)
      return;
    if (this.state == enemyExitingLeft)
      this.x -= (this.speedX++);
    else if (this.state == enemyExitingRight)
      this.x += (this.speedX++);
    if (this.state == enemyExitingLeft || this.state == enemyExitingRight) {
      if (this.x + this.w < 0 || this.x > width)
        this.state = enemyHasExited;
      return;
    }

    if (this.timeout <= 0) {
      let newMove = random() * 10;

      // Moving away.
      if (newMove < 1) {
        this.state = enemyStanding;
        this.speedX = (this.x > characterX) ? Math.abs(this.speedX) : -Math.abs(this.speedX);
      }

      // Movin in.
      else if (newMove < 8) {
        this.state = enemyStanding;
        this.speedX = (this.x < characterX) ? Math.abs(this.speedX) : -Math.abs(this.speedX);
      }

      // Movin in.
      else {
        let directionLeft = (this.x > characterX);
        this.state = directionLeft ? enemyFightingLeft : enemyFightingRight;
        this.speedX = directionLeft ? Math.abs(this.speedX) : -Math.abs(this.speedX);
      }

      // New random duration of state.
      this.timeout = random() * 10 + 1;
    }
    else
    {
      this.timeout--;
      this.x = this.x + this.speedX;
    }
  }


  exitLeft() {
    this.state = enemyExitingLeft;
  }

  exitRight() {
    this.state = enemyExitingRight;
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
