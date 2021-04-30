"use strict";

/**
This game uses:
ml5.js Handpose:
https://learn.ml5js.org/#/reference/handpose

annyang:
https://www.talater.com/annyang/
*/

// /////////////////////////////// //
//          GENERAL ASSETS
// -- Fonts, sounds and images -- //

// Fonts.
let workSansRegular;
let workSansBold;

// Sounds.
let soundCorrect;
let soundWrong;

// Images.
let instructionsPushTheEquations;
let instructionsSayTheColour;
let homeBackground;
let gameBackground;

// Images of icons and buttons.
let iconPushTheEquations;
let iconSayTheColour;
let iconMemory;
let iconSpeed;

let imgStartButtonReleased;
let imgStartButtonHover;
let imgStartButtonPressed;

let imgDoneButtonReleased;
let imgDoneButtonHover;
let imgDoneButtonPressed;

// /////////////////////////////// //
// The global score is the sum of the scores of each mini game.
let globalScore;


// Preload the fonts, sounds and images.
function preload() {
  workSansRegular = loadFont('assets/fonts/WorkSans-Regular.ttf');
  workSansBold = loadFont('assets/fonts/WorkSans-Bold.ttf');
  soundCorrect = loadSound('assets/sounds/correct.mp3');
  soundWrong = loadSound('assets/sounds/wrong.mp3');

  instructionsPushTheEquations = loadImage(`assets/images/instructionsPushTheEquations.png`);
  instructionsSayTheColour = loadImage(`assets/images/instructionsSayTheColour.png`);
  homeBackground = loadImage(`assets/images/homeBackground.jpg`);
  gameBackground = loadImage(`assets/images/gameBackground.jpg`);

  iconPushTheEquations = loadImage(`assets/images/icons/iconPushTheEquations.png`);
  iconSayTheColour = loadImage(`assets/images/icons/iconSayTheColour.png`);
  iconMemory = loadImage(`assets/images/icons/iconMemory.png`);
  iconSpeed = loadImage(`assets/images/icons/iconSpeed.png`);

  imgStartButtonReleased = loadImage(`assets/images/buttons/buttonStartReleased.png`);
  imgStartButtonHover = loadImage(`assets/images/buttons/buttonStartHover.png`);
  imgStartButtonPressed = loadImage(`assets/images/buttons/buttonStartPressed.png`);

  imgDoneButtonReleased = loadImage(`assets/images/buttons/buttonDoneReleased.png`);
  imgDoneButtonHover = loadImage(`assets/images/buttons/buttonDoneHover.png`);
  imgDoneButtonPressed = loadImage(`assets/images/buttons/buttonDonePressed.png`);
}

/**
Starts the webcam and the Handpose, creates the equation.
*/
function setup() {
  createCanvas(1440, 900);

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
Handles the states of the program: loading, running
*/
function draw() {

  drawGameBackground();

  if (state === `loading`) {
    drawHomeBackground();
    loading();
  }
  else if (state === `title`) {
    drawHomeBackground();
    title();
  }

  else if (state === `titlePushEquations`) {
    titlePushEquations();
  }
  else if (state === `drawPushEquations`) {
    drawPushEquations();
  }
  else if (state === `endingPushEquations`) {
    endingPushEquations();
  }

 else if (state === `titleSayTheColour`) {
    titleSayTheColour();
  } else if (state === `drawSayTheColour`) {
    drawSayTheColour();
  }

  else if (state === `titleMemory`) {
    titleMemory();
  } else if (state === `drawMemory`) {
    drawMemory();
  }

  else if (state === `titleSuperFocus`) {
    titleSuperFocus();
  } else if (state === `drawSuperFocus`) {
    drawSuperFocus();
  }

  // Draw notification if any.
  drawNotification();
}


// Backgrounds
function drawBackgroundPale() {
  background(250, 252, 254);
}

function drawHomeBackground() {
  push();
  image(homeBackground, 0, 0);
  pop();
}

function drawGameBackground() {
  push();
  image(gameBackground, 0, 0);
  pop();
}

// ---------------------------- //

// Keyboard control.
function keyPressed() {

  // When in the title screen of each game, any key starts the game.
  // Switch to the running state.
  if (state === `titlePushEquations`) {
    state = `drawPushEquations`;
  }

  if (state === `titleSayTheColour`) {
    state = `drawSayTheColour`;
  }

  if (state === `titleMemory`) {
    initMemory();
    state = `drawMemory`;
  }

  if (state === `titleSuperFocus`) {
    initSuperFocus();
    state = `drawSuperFocus`;
  }
}
