"use strict";

/*************************************
Game: Push the equations.
The user must push away the equations that are not equal to the number at the center of the screen.
When a correct equation touches the number, the score increases.
When the user pushes away an incorrect equation, the score increases.

The starting point for this game was the Bubble Popper exercice.
https://valentinesenegas.github.io/cart263/exercises/bubble-popper-plus-plus/
*************************************/

// Current state of program
let state = `loading`;
// User's webcam.
let video;
// The name of our model.
let modelName = `Handpose`;
// Handpose object (using the name of the model).
let handpose;

// The current set of predictions made by Handpose once it's running.
let predictions = [];

// The scale of the hand points drawn on screen.
let scale = 2;

// The equations that will arrive towards the center.
let equation;

// The number of correct answers for this mini game.
let scorePushTheEquations = 0;

// Number of rounds the user has to play.
let roundMaxPushTheEquations = 10;
// Current round.
let round = 0;

// The number at the center of the screen.
let number;


// Title for the game where the user pushes the equations away
function titlePushEquations() {
  push();
  fill(74, 74, 104);
  textAlign(CENTER, CENTER);
  textFont(workSansBold);
  textSize(28);
  text(`Push away the equations that are not equal to the number.`, width / 2, 50);
  textFont(workSansRegular);
  textSize(24);
  text(`Use only one hand. Make sure to keep it open and don’t move it too fast.`, width / 2, 100);

  textSize(18);
  text(`Press any key to start.`, width / 2, height - 200);

  pop();
  image(instructionsPushTheEquations, 400, 250);
}

//---- RUNNING ----//
/**
Displays the webcam.
If there is a hand it outlines it and highlights all of the points of the hand.
*/
function drawPushEquations() {
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
        let d = dist(equation.x, equation.y, keypoint[0] * scale, keypoint[1] * scale);
        if (d < 20) {
          equation.reject();
          equation.reverseSpeed();
          if (equation.isCorrect())
            incorrectAnswerPushTheEquations();
          else
            correctAnswerPushTheEquations();
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
      correctAnswerPushTheEquations();
    else
      incorrectAnswerPushTheEquations();
    equation = new Equation(1);
    equation.generate();
  }
  equation.display();
  displayScorePushTheEquations();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(216, 138, 85);
      noStroke();
      ellipse(keypoint[0] * scale, keypoint[1] * scale, 10, 10);
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

// When correct answer: Increment the score, play a sound.
function correctAnswerPushTheEquations() {
  newRoundPushTheEquations();
  scorePushTheEquations += 10;
  soundCorrect.play();
}

// When incorrect answer, only play a sound.
function incorrectAnswerPushTheEquations() {
  newRoundPushTheEquations();
  soundWrong.play();
}

function newRoundPushTheEquations() {
  round++;
  // When the user has had reached the last round, switch to the ending state.
  if (round === roundMaxPushTheEquations) {
    round = 0;
    state = `title`;
  }
}

// Display the number of correct answers.
function displayScorePushTheEquations() {
  push();
  textFont(workSansRegular);
  textSize(24);
  fill(237, 75, 158);
  text(`Score: ` + scorePushTheEquations, 15, 40);
  pop();
}
