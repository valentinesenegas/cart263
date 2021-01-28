// Person
// A class defining a person that can be displayed as an image

class Person {
  // constructor(x, y, image)
  // Stores position and image as properties
  // Creates an angle property for potential rotation
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.angle = random(0, 3);
  }

  // Calls the display method.
  update() {
    this.display();
  }

  // Displays this person's image on the canvas at its position and rotation.
  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.angle);
    image(this.image, 0, 0);
    pop();
  }

  // Checks whether the position x,y is inside this person's image
  // Returns: true if the click was inside the image and false otherwise
  overlap(x, y) {
    // Check if the x is greater than the left side and less that the right side
    // and greater than the top and less than the bottom of the image
    // Uses the width and height properties of the image to track its size
    if (x > this.x - this.image.width / 2 &&
      x < this.x + this.image.width / 2 &&
      y > this.y - this.image.height / 2 &&
      y < this.y + this.image.height) {
      return true;
    }
    else {
      // If the sound is already playing, nothing happens. If not, sound plays.
      if (!wrong.isPlaying()) {
        wrong.play();
        }
      return false;
    }
  }
}
