"use strict";

const timeToReachCenterElement = 5000; // 5 seconds

class Element {
  constructor() {
    // Select where the element will appear: top/bottom or left/right.
    if (random() < 0.5) {
      this.x = random(width); // Choose the X position at random.
      this.y = random() < (0.5) ? 0 : height; // Chosse if the element appears at the top or at the bottom.
    } else {
      // Left/right
      this.x = random() < (0.5) ? 0 : width; // Chosse if the element appears at the left or at the right.
      this.y = random(height); // Choose the Y position at random.
    }
    this.initX = this.x;
    this.initY = this.y;
    this.size = 100;
    this.vx = (width / 2 - this.x) / timeToReachCenter;
    this.vy = (height / 2 - this.y) / timeToReachCenter;

    this.representation = "";
    this.correct = false;
    this.startTime = millis();
  }



  // Generate the two numbers that will be added or multipied together and the result of this operation.
  generate() {
    let index;

    // Keep correct result or generate incorrect result.
    if (random() < 0.5) {
      index = Math.floor(random(selectedWordsSuperFocus.length)); // Correct choice.
      this.representation = pool[selectedWordsSuperFocus[index]];
      this.correct = true;
    }
    else {
      do
        index = Math.floor(random(pool.length)); // Incorrect choice.
      while (isWordAlreadySelectedSuperFocus(selectedWordsSuperFocus.length, index));
      this.representation = pool[index];
      this.correct = false;

    }
    console.log(`this.representation: `+ this.representation);
  }

  // Displays the element
  display() {
    // Circle.
    push();
    noStroke();
    fill(237, 75, 158, 850);
    ellipse(this.x, this.y, this.size);

    // Text.
    fill(255, 255, 255);
    textAlign(CENTER, CENTER);
    textFont(workSansRegular);
    textSize(28);
    text(this.representation, this.x, this.y);
    pop();
  }

  // The element moves toward the center or towards the screen edges if rejected.
  move() {
    let elapsed = millis() - this.startTime;
    this.x = this.initX + this.vx * elapsed;
    this.y = this.initY + this.vy * elapsed;
  }


  isOutOfBounds() {
    if (this.y < 0 || this.x < 0 || this.y > height || this.x > width) {
      return true;
    }
  }

  get () {
    return this.result;
  }

  isCorrect() {
    return this.correct;
  }
}
