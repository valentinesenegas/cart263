class Bubble {
  constructor() {
    this.x = random(width);
    this.y = height;
    this.size = 100;
    this.vx = 0;
    this.vy = -2
  }

// Displays the bubble as a circle
  displayBubble() {
    push();
    noStroke();
    fill(100, 100, 200, 150);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  // Resets the bubble to the bottom of the screen in a new x position
  resetBubble() {
    this.x = random(width);
    this.y = height;
  }

  // Moves the bubble according to its velocity
  moveBubble() {
    this.x += this.vx;
    this.y += this.vy;
  }

  increaseDifficulty() {
    this.vy -= 0.5;
    this.size -= 8;
  }


}
