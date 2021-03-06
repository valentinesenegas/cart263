// Floors on each side.

class Floor {
  constructor(x) {
    this.x = x;
    this.y = height + 450;
    this.yStart = 650;
    this.speedY = 8;
  }

  draw() {
    push();
    fill(224,224,224);
    noStroke();
    rectMode(CORNER);
    rect(this.x, this.y, 375, 15);
    pop();
  }

  goUpStart() {
    if (this.y > this.yStart) {
      this.y -= this.speedY;
    }
  }

  goUpEnd() {
    if (this.y > 0) {
      this.y -= this.speedY;
    }
  }

  hasReachedStartPosition() {
    return (this.y <= this.yStart);
  }

  hasReachedEndPosition() {
    return (this.y < 0);
  }
}
