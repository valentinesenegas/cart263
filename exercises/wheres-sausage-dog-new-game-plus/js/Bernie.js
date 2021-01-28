// Bernie
// An extension of the Person class
// Adds the idea of being found when clicked
// and spinning when found

class Bernie extends Person {
  // constructor(x,y,image)
  // Calls the super constructor
  // Adds properties for being found and for a rotation speed
  constructor(x, y, image) {
    super(x, y, image);

    this.found = false;
    this.rotationSpeed = 0.25;
  }

  // Calls the super update() and changes angle if found (to rotate!)
  update() {
    super.update();
    if (this.found) {
      this.angle += this.rotationSpeed;
    }
  }

  // Checks if this Bernie was clicked and remembers it was found if so
  mousePressed() {
    if (!this.found && this.overlap(mouseX, mouseY)) {
      this.found = true;

      yay.play();
      setTimeout(reset, 3000);
    }

    else {
      wrong.play();
    }
  }
}
