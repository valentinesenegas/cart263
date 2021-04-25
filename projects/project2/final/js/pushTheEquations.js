// Game: Push the equations.

// Change the scale of the hand points drawn on screen.
let scale = 2;

// Title for the game where the user pushes the equations away
function titlePushEquations() {
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
        let d = dist(equation.x, equation.y, keypoint[0] * scale, keypoint[1] * scale);
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
