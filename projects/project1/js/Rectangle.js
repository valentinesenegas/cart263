// Rectangle and Collisions

"use strict";

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  detectCollision(hitRectangle) {
    rect(this.x, this.y, this.w, this.h);
    rect(hitRectangle.x, hitRectangle.y, hitRectangle.w, hitRectangle.h);
    return collideRectRect(this.x, this.y, this.w, this.h, hitRectangle.x, hitRectangle.y, hitRectangle.w, hitRectangle.h);
  }
}
