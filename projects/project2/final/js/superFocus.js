"use strict";

/*************************************
Game: Super Focus
The user will be shown words or numbers for a few seconds.
On the next screen, the user must touch only the words and
numbers that have been shown to them.
*************************************/

// List of selected words that will be presented to the user.
let selectedWordsSuperFocus = [];

// Words found by the user.
let foundWordsSuperFocus = [];

// Number of words that are randomly selected and that will be displayed on the screen.
let numberOfSelectedWordsSuperFocus = 9;

// Countdown.
let displayAllWordsTTLSuperFocus;
let displayAllWordsTTLMaxSuperFocus = 60 * 1; // 60 fps x 5 seconds

// Display the countdown in a horizontal bar.
let rectangleTimeLeftXSuperFocus = 0;
let rectangleTimeLeftYSuperFocus;
let rectangleTimeLeftWSuperFocus;
let rectangleTimeLeftHSuperFocus = 30;

// The score for this mini game.
let scoreSuperFocus = 0;

// Number of rounds the user has to play.
let roundMaxSuperFocus = 10;
// Current round.
let roundSuperFocus = 0;

// The element that will arrive towards the center.
let element = null;

// Title screen for the game. Contains instructions.
function titleSuperFocus() {
  push();
  fill(255, 255, 255);
  textFont(workSansBold);
  textSize(24);
  textAlign(CENTER, CENTER);
  text(`Try to remember the words that will appear on screen.`, width / 2, 70);
  text(`You will be asked to repeat them shortly after.`, width / 2, 120);
  text(`On the final screen, you will have to touch only
    the words and numbers that have been shown to you.`, width / 2, height/2);

  textSize(18);
  text(`Press any key to start.`, width / 2, height - 200);
  pop();
}

// To create the array of selected words, verify if the candidate word is already in the array.
function isWordAlreadySelectedSuperFocus(numberOfWordsAlreadySelectedSuperFocus, candidate) {
  for (let word = 0; word < numberOfWordsAlreadySelectedSuperFocus; word++)
    if (selectedWordsSuperFocus[word] === candidate)
      return true;
  return false;
}

// Select random words from the pool of possible words.
function initSuperFocus() {

  for (let word = 0; word < numberOfSelectedWordsSuperFocus; word++) {
    let candidate;
    do
      candidate = Math.floor(random(pool.length));
    while (isWordAlreadySelectedSuperFocus(word, candidate));
    selectedWordsSuperFocus[word] = candidate;
    foundWordsSuperFocus[word] = false;
    displayAllWordsTTLSuperFocus = displayAllWordsTTLMaxSuperFocus;
  }

  element = new Element();
  element.generate();

}

// Display the words and the score.
function drawSuperFocus() {
  push();
  noStroke();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textFont(workSansBold);

  if (displayAllWordsTTLSuperFocus != 0)
    displayAllWordsTTLSuperFocus--;

  // Table with 9 cells.
  for (let y = 0; y < 3; y++)
    for (let x = 0; x < 3; x++) {
      let word = x + y * 3;

      // Display the words if the time is not up.
      if (displayAllWordsTTLSuperFocus != 0) {
        // Rectangles underneath the words.
        fill('rgba(140,140,161, 0.4)');
        rect((x + 1) * width / 4, (y + 1) * height / 4, 300, 100, borderRadius, borderRadius, borderRadius, borderRadius);

        textSize(22);
        fill(255, 255, 255);
        text(pool[selectedWordsSuperFocus[word]], (x + 1) * width / 4, (y + 1) * height / 4);

        displayTimeLeftSuperFocus();
      } else {
        textSize(32);
        fill(140, 140, 161);
        text(`Touch the words you remember.`, width / 2, 100);

        drawSuperFocusHandAndElement();
      }
    }

  pop();
}

// Display the time left with the words appearing on the screen.
// It is displayed in a horizontal bar. Its width decreases.
function displayTimeLeftSuperFocus() {
  push();
  rectMode(CORNER);
  rectangleTimeLeftWSuperFocus = map(displayAllWordsTTLSuperFocus, 0, displayAllWordsTTLMaxSuperFocus, 0, width);
  rectangleTimeLeftYSuperFocus = height - rectangleTimeLeftHSuperFocus;
  fill(74, 74, 104);
  rect(rectangleTimeLeftXSuperFocus, rectangleTimeLeftYSuperFocus, rectangleTimeLeftWSuperFocus, rectangleTimeLeftHSuperFocus);
  pop();
}


/**
Displays the hand as instructed by the webcam.
If there is a hand it outlines it and highlights all of the points of the hand.
*/
function drawSuperFocusHandAndElement() {
  let testOutOfBounds = true;
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      let d = dist(element.x, element.y, keypoint[0] * scale, keypoint[1] * scale);
      if (d < element.size/2) {
        if (element.isCorrect())
          correctAnswerSuperFocus();
        else
          incorrectAnswerSuperFocus();
        element = new Element();
        element.generate();
        testOutOfBounds = false;
      }
    }
  }

  drawKeypoints();

  // Move the element.
  element.move();
  // Test if the element is out of the screen and check if it was correct to let it go out of the screen.
  if (testOutOfBounds) {
    if (element.isOutOfBounds()) {
      if (element.isCorrect())
        incorrectAnswerSuperFocus();
      else
        correctAnswerSuperFocus();
      element = new Element();
      element.generate();
    }
  }
  // Display the element.
  element.display();
  // Display the score in the top left corner.
  displayScoreSuperFocus();
}

// Draw ellipses over the detected keypoints of the hand.
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(216, 138, 85);
      noStroke();
      ellipse(keypoint[0] * scale, keypoint[1] * scale, 20);
    }
  }
}

// When correct answer: Increment the score, play a sound.
function correctAnswerSuperFocus() {
  newRoundSuperFocus();
  scoreSuperFocus += 10;
  soundCorrect.play();
}

// When incorrect answer, only play a sound.
function incorrectAnswerSuperFocus() {
  newRoundSuperFocus();
  soundWrong.play();
}

function newRoundSuperFocus() {
  roundSuperFocus++;
  // When the user has had reached the last round, switch to the ending state.
  if (roundSuperFocus === roundMaxSuperFocus) {
    roundSuperFocus = 0;
    state = `title`;
  }
}

// Display the number of correct answers.
function displayScoreSuperFocus() {
  push();
  textFont(workSansRegular);
  textAlign(LEFT);
  textSize(24);
  fill(237, 75, 158);
  text(`Score: ` + scoreSuperFocus, 15, 40);
  pop();
}
