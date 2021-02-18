"use strict";

/**
Bubble Popper++
Valentine Sénégas

Turns the index finger as seen through the webcam into a pin that can pop
a bubble that floats from the bottom of the screen to the top.
Uses:
ml5.js Handpose:
https://learn.ml5js.org/#/reference/handpose

*/

"use strict";

// Current state of program
let state = `loading`; // loading, running
// User's webcam
let video;
// The name of our model
let modelName = `Handpose`;
// Handpose object (using the name of the model for clarity)
let handpose;
// The current set of predictions made by Handpose once it's running
let predictions = [];

// The bubble we will be popping
let bubble;
// The pin
let pin = {
  tip: {
    x: undefined,
    y: undefined
  },
  head: {
    x: undefined,
    y: undefined,
    size: 20
  }
};

// The number of bubbles that were popped.
let score = 0;

// Sounds and Font.
let popSound;
let manyBubblesSound;
let truculenta;

// Preload the sounds and font.
function preload() {
  popSound = loadSound("assets/sounds/pop.wav");
  manyBubblesSound = loadSound("assets/sounds/manyBubbles.wav");
  truculenta = loadFont('assets/fonts/Truculenta_12pt-Regular.ttf');
}

/**
Starts the webcam and the Handpose, creates a bubble object
*/
function setup() {
  createCanvas(640, 480);

  // Start webcam and hide the resulting HTML element
  video = createCapture(VIDEO);
  video.hide();

  // Start the Handpose model and switch to our running state when it loads
  handpose = ml5.handpose(video, {
    flipHorizontal: true
  }, function() {
    // Switch to the title state
    state = `title`;
  });

  // Listen for prediction events from Handpose and store the results in our
  // predictions array when they occur
  handpose.on(`predict`, function(results) {
    predictions = results;
  });

  // Create our basic bubble
  bubble = new Bubble();
}

/**
Handles the two states of the program: loading, running
*/
function draw() {
  background(255, 226, 222);

  if (state === `loading`) {
    loading();
  } else if (state === `running`) {
    running();
  } else if (state === `title`) {
    title();
  } else if (state === `ending`) {
    ending();
  }
}

//----||||****  STATES  ****||||----//

//---- LOADING ----//
/**
Displays a simple loading screen with the loading model's name.
*/
function loading() {
  push();
  textFont(truculenta);
  textSize(32);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(`Loading ${modelName}...`, width / 2, height / 2);
  pop();
}

//---- TITLE ----//
/**
Displays a title screen with instructions.
*/
function title() {
  push();
  textFont(truculenta);
  textSize(20);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(`Use your index finger to pop the bubbles!`, width / 2, height / 1.5);
  textSize(24);
  text(`Press any key to start.`, width / 2, height / 2);
  pop();
}

//---- RUNNING ----//
/**
Displays the webcam.
If there is a hand it outlines it and highlights the tip of the index finger.
*/
function running() {
  // Use these lines to see the video feed
  // const flippedVideo = ml5.flipImage(video);
  // image(flippedVideo, 0, 0, width, height);

  // Use this line to just see a black background. More theatrical!
  // background(255, 239, 237);
  background(255, 226, 222);

  // Check if there currently predictions to display
  if (predictions.length > 0) {
    // If yes, then get the positions of the tip and base of the index finger
    updatePin(predictions[0]);

    // Check if the tip of the "pin" is touching the bubble
    let d = dist(pin.tip.x, pin.tip.y, bubble.x, bubble.y);
    if (d < bubble.size / 2) {
      // Pop!
      popSound.play();
      bubble.resetBubble();
      bubble.increaseDifficulty();
      incrementScore();
    }
    // Display the current position of the pin
    displayPin();
  }

  // Handle the bubble's movement and display (independent of hand detection
  // so it doesn't need to be inside the predictions check)
  bubble.moveBubble();
  checkOutOfBounds();
  bubble.displayBubble();
  displayScore();
}

//---- ENDING ----//
function ending() {
  push();
  textFont(truculenta);
  textSize(30);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(`Yay! You popped ${score} bubbles!`, width / 2, height / 2);
  pop();
}

/**
Updates the position of the pin according to the latest prediction
*/
function updatePin(prediction) {
  pin.tip.x = prediction.annotations.indexFinger[3][0];
  pin.tip.y = prediction.annotations.indexFinger[3][1];
  pin.head.x = prediction.annotations.indexFinger[0][0];
  pin.head.y = prediction.annotations.indexFinger[0][1];
}

// Increment the score (number of bubbles that were popped).
function incrementScore() {
  score++;

  // When the user has popped 10 bubbles, switch to the ending state.
  if (score === 10) {
    state = `ending`;
    manyBubblesSound.play();
  }
}

// Display the number of bubbles that were popped.
function displayScore() {
  push();
  textFont(truculenta);
  textSize(24);
  fill(255, 102, 102);
  text(score + ` bubbles popped`, 15, 40);
  pop();
}

/**
Resets the bubble if it moves off the top of the canvas
*/
function checkOutOfBounds() {
  if (bubble.y < 0) {
    bubble.resetBubble();
  }
}

/**
Displays the pin based on the tip and base coordinates.
Draws a line between them and adds a red pinhead.
*/
function displayPin() {
  // Draw pin
  push();
  stroke(255);
  strokeWeight(2);
  line(pin.tip.x, pin.tip.y, pin.head.x, pin.head.y);
  pop();

  // Draw pinhead
  push();
  fill(255, 102, 102);
  noStroke();
  ellipse(pin.head.x, pin.head.y, pin.head.size);
  pop();
}

// Keyboard control.
// Press any key to start the game.
function keyPressed() {
  // Switch to the running state.
  if (state === `title`) {
    state = `running`;
  }
}
