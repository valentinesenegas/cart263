// Rectangle and Collisions.
// Rectangles are drawn above the character and the enemies to detect collisions using p5.collide2D, but are in fact not drawn on the canvas for aesthetic reasons.

"use strict";

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  detectCollision(hitRectangle) {
    //rect(this.x, this.y, this.w, this.h);  Debug code, do not delete.
    //rect(hitRectangle.x, hitRectangle.y, hitRectangle.w, hitRectangle.h);  Debug code, do not delete.
    return collideRectRect(this.x, this.y, this.w, this.h, hitRectangle.x, hitRectangle.y, hitRectangle.w, hitRectangle.h);
  }
}
