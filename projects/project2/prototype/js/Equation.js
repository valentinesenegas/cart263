

const timeToReachCenter = 3000; // 3 seconds

class Equation {
  constructor(difficulty) {
    // Select where the equation will appear: top/bottom or left/right.
    if (random() < 0.5) {
      this.x = random(width);                 // Choose the X position at random.
      this.y = random() < (0.5) ? 0 : height; // Chosse if the equation appears at the top or at the bottom.
    }
    else {
      // Left/right
      this.x = random() < (0.5) ? 0 : width; // Chosse if the equation appears at the left or at the right.
      this.y = random(height);              // Choose the Y position at random.
    }
    this.initX = this.x;
    this.initY = this.y;
    this.size = 100;
    this.vx = (width/2 - this.x) / timeToReachCenter;
    this.vy = (height/2 - this.y) / timeToReachCenter;
    this.rejected = false;

    this.difficulty = difficulty;
    this.representation = "";
    this.result = 0;
    this.correct = false;
    this.startTime = millis();
  }


// Generate the two numbers that will be added or multipied together and the result of this operation.
  generate() {
    let nb1;
    let nb2;
    let result;

    switch (Math.floor(random(this.difficulty + 1))) {
      // Addition
      case 0:
        nb1 = Math.floor(random(10) + 1);
        nb2 = Math.floor(random(10) + 1);
        result = nb1 + nb2;
        this.representation = nb1 + " + " + nb2;
        this.result = result;
        this.correct = true;
        break;

      // Multiplication
      case 1:
        nb1 = Math.floor(random(10) + 1);
        nb2 = Math.floor(random(10) + 1);
        result = nb1 * nb2;
        this.representation = nb1 + " * " + nb2;
        this.result = result;
        this.correct = true;
        break;
    }

    // Keep correct result or generate incorrect result.
    if (random() < 0.5)
      return;

    // Generate incorrect result.
    this.result = Math.floor(random(this.result * 2)) + 1;
    this.correct = false;
  }

  // Displays the equation in a circle.
  display() {
    // Circle.
    push();
    noStroke();
    fill(75, 77, 237, 150);
    ellipse(this.x, this.y, this.size);

    /// Equation written inside.
    fill(74, 74, 104);
    textAlign(CENTER, CENTER);
    textFont(workSansRegular);
    textSize(28);
    text(this.representation, this.x, this.y);
    pop();
  }

  reject() {
    this.rejected = true;
  }

  isRejected() {
    return this.rejected;
  }

  // The equation moves toward the center or towards the screen edges if rejected.
  move() {
    let elapsed = millis() - this.startTime;
    this.x = this.initX + this.vx * elapsed;
    this.y = this.initY + this.vy * elapsed;
  }

  reverseSpeed() {
    this.vx = -this.vx * 4;
    this.vy = -this.vy * 4;
  }

  isOutOfBounds() {
    if (this.y < 0 || this.x < 0 || this.y > height || this.x > width) {
      return true;
    }
  }

  isAtCenter() {
    return (dist(this.x, this.y,  width / 2, height / 2) < 10);
  }

  getResult() {
    return this.result;
  }

  isCorrect() {
    return this.correct;
  }
}
