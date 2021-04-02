"use strict";

/**
The user must push away the equations that are not equal to the number at the center of the screen.

Uses:
ml5.js Handpose:
https://learn.ml5js.org/#/reference/handpose
*/

// Current state of program
let state = `loading`; // loading, running
// User's webcam.
let video;
// The name of our model.
let modelName = `Handpose`;
// Handpose object (using the name of the model).
let handpose;
// The current set of predictions made by Handpose once it's running.
let predictions = [];

// The equations that will arrive towards the center.
let equation;

// The number of correct answers.
let score = 0;

// The number at the center of the screen.
let number;

// Fonts, sounds and images.
let workSansRegular;
let workSansBold;
let soundCorrect;
let soundWrong;
let instructions;

// Preload the fonts, sounds and images.
function preload() {
  workSansRegular = loadFont('assets/fonts/WorkSans-Regular.ttf');
  workSansBold = loadFont('assets/fonts/WorkSans-Bold.ttf');
  soundCorrect = loadSound('assets/sounds/correct.mp3');
  soundWrong = loadSound('assets/sounds/wrong.mp3');
  instructions = loadImage(`assets/images/instructions.png`);
}

/**
Starts the webcam and the Handpose, creates the equation.
*/
function setup() {
  createCanvas(600, 550);

  // Start webcam and hide the resulting HTML element
  video = createCapture(VIDEO);
  // video.size(width, height);
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

  // Create our basic equation.
  equation = new Equation(1);
  equation.generate();
}

/**
Handles the two states of the program: loading, running
*/
function draw() {
  background(255, 255, 255);

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
  textFont(workSansRegular);
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
  fill(74, 74, 104);
  textFont(workSansRegular);
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(`Use only one hand. Don’t move it too fast.`, width / 2, 60);
  textSize(18);
  text(`Press any key to start.`, width / 2, 500);
  textFont(workSansBold);
  text(`Push away the equations that are not equal to the number.`, width / 2, 30);
  pop();
  image(instructions, 10, 150);
}

//---- RUNNING ----//
/**
Displays the webcam.
If there is a hand it outlines it and highlights all of the points of the hand.
*/
function running() {
  // Use these lines to see the video feed
  // const flippedVideo = ml5.flipImage(video);
  // image(flippedVideo, 0, 0, width, height);

  background(250, 250, 250);

  displayNumber();

  if (equation.isRejected() === false) {
    for (let i = 0; i < predictions.length; i += 1) {
      const prediction = predictions[i];
      for (let j = 0; j < prediction.landmarks.length; j += 1) {
        const keypoint = prediction.landmarks[j];
        let d = dist(equation.x, equation.y, keypoint[0], keypoint[1]);
        if (d < 20) {
          equation.reject();
          equation.reverseSpeed();
          if (equation.isCorrect())
            decrementScore();
          else
            incrementScore();
        }
      }
    }
  }

  drawKeypoints();

  // Handle the equation's movement and display (independent of hand detection
  // so it doesn't need to be inside the predictions check)
  equation.move();
  if (equation.isOutOfBounds())  {
    equation = new Equation(1);
    equation.generate();
  }
  else if (equation.isAtCenter()) {
    if (equation.isCorrect())
      incrementScore();
    else
      decrementScore();
    equation = new Equation(1);
    equation.generate();
  }
  equation.display();
  displayScore();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(216, 138, 85);
      noStroke();
      ellipse(keypoint[0], keypoint[1], 10, 10);
    }
  }
}


// Display the number at the center of the screen.
function displayNumber() {
  push();
  fill(75, 77, 237);
  textFont(workSansBold);
  textSize(40);
  textAlign(CENTER, CENTER);
  text(equation.getResult(), width / 2, height / 2);
  pop();
}


//---- ENDING ----//
function ending() {
  push();
  fill(74, 74, 104);
  textFont(workSansRegular);
  textSize(30);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(`Yay! You got ${score} correct answers!`, width / 2, height / 2);
  pop();
}


// Increment the score.
function incrementScore() {
  score++;
  soundCorrect.play();

  // When the user has had 10 good answers, switch to the ending state.
  if (score === 10) {
    state = `ending`;
  }
}

function decrementScore() {
  score--;
  soundWrong.play();
}

// Display the number of bubbles that were popped.
function displayScore() {
  push();
  textFont(workSansRegular);
  textSize(24);
  fill(237, 75, 158);
  text(`Score: ` + score, 15, 40);
  pop();
}

// ---------------------------- //

// Keyboard control.
// Press any key to start the game.
function keyPressed() {
  // Switch to the running state.
  if (state === `title`) {
    state = `running`;
  }
}
