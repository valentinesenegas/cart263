// Foods that are on the platform.

imgFood = [];
let numImgFood = 13;

// Preload the images in the array
function preloadFood() {
  for (let i = 0; i < numImgFood; i++) {
    // Add the loaded images to the images array.
      imgFood.push(loadImage(`assets/images/food/food${i}.png`));
  }
}


class Food {
  constructor() {
    this.x = random(400, 870);
    this.y = 630;
    this.img = random(imgFood);
  }

  draw() {
    push();
    imageMode(CENTER);
    image(this.img, this.x, this.y);
    pop();
  }
}
