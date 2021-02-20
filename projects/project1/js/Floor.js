// Floors on each side.

class Floor {
  constructor(x) {
    this.x = x;
  }

  draw() {
    push();
    fill(224,224,224);
    noStroke();
    rectMode(CORNER);
    rect(this.x, 650, 375, 15);
    pop();
  }
}
