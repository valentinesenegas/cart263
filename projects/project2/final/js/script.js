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
let instructions;
let instructionsSayTheColour;
let homeBackground;

// Images of icons and buttons.
let iconPushTheEquations;
let iconSayTheColour;
let iconMemory;
let iconSpeed;

let imgStartButtonReleased;
let imgStartButtonHover;
let imgStartButtonPressed;

// /////////////////////////////// //
// The global score is the sum of the scores of each mini game.
let globalScore;


// Preload the fonts, sounds and images.
function preload() {
  workSansRegular = loadFont('assets/fonts/WorkSans-Regular.ttf');
  workSansBold = loadFont('assets/fonts/WorkSans-Bold.ttf');
  soundCorrect = loadSound('assets/sounds/correct.mp3');
  soundWrong = loadSound('assets/sounds/wrong.mp3');

  instructions = loadImage(`assets/images/instructions.png`);
  instructionsSayTheColour = loadImage(`assets/images/instructionsSayTheColour.png`);
  homeBackground = loadImage(`assets/images/homeBackground.jpg`);

  iconPushTheEquations = loadImage(`assets/images/icons/iconPushTheEquations.png`);
  iconSayTheColour = loadImage(`assets/images/icons/iconSayTheColour.png`);
  iconMemory = loadImage(`assets/images/icons/iconMemory.png`);
  iconSpeed = loadImage(`assets/images/icons/iconSpeed.png`);

  imgStartButtonReleased = loadImage(`assets/images/buttons/buttonStartReleased.png`);
  imgStartButtonHover = loadImage(`assets/images/buttons/buttonStartHover.png`);
  imgStartButtonPressed = loadImage(`assets/images/buttons/buttonStartPressed.png`);
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

  drawBackgroundPale();

  if (state === `loading`) {
    drawBackgroundSpace();
    loading();
  }
  else if (state === `title`) {
    drawBackgroundSpace();
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
    displayScore();
  }

  else if (state === `titleMemory`) {
    titleMemory();
  } else if (state === `drawMemory`) {
    drawMemory();
  }

  // Draw notification if any.
  drawNotification();
}


// Backgrounds
function drawBackgroundPale() {
  background(255, 255, 255);
}

function drawBackgroundSpace() {
  background(255, 255, 255);
  push();
  image(homeBackground, 0, 0);
  pop();
}

// ---------------------------- //

// Arrow keys and their keyCodes
let keyA = 65;
let keyS = 83;
let keyD = 68;
let keyF = 70;

let keyH = 72;
let keyJ = 74;
let keyK = 75;
let keyL = 76;

let keyEnter = 13;

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

  // Temporary: When in the title screen, letters of the keyboard allow to access specific games.
  // A: Push pushTheEquations.
  // B: Say The Colour.
  // D: Memory.
  if (state === `title`) {
    if (keyIsDown(keyA)){
      state = `titlePushEquations`;
    }

    if (keyIsDown(keyS)) {
      state = `titleSayTheColour`;
    }

    if (keyIsDown(keyD)) {
      state = `titleMemory`;
    }
  }
}
