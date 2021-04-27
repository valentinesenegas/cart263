"use strict";

/**
The user must push away the equations that are not equal to the number at the center of the screen.
When a correct equation touches the number, the score increases. When an incorrect equation touches the number, the score decreases.
When the user pushes away a correct equation, the score decreases. When the user pushes away an incorrect equation, the score increases.

The starting point for this prototype was the Bubble Popper exercice.
https://valentinesenegas.github.io/cart263/exercises/bubble-popper-plus-plus/

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

// Images of buttons
let buttonPushTheEquations;
let buttonSayTheColour;
let buttonMemory;
let buttonSpeed;

// Preload the fonts, sounds and images.
function preload() {
  workSansRegular = loadFont('assets/fonts/WorkSans-Regular.ttf');
  workSansBold = loadFont('assets/fonts/WorkSans-Bold.ttf');
  soundCorrect = loadSound('assets/sounds/correct.mp3');
  soundWrong = loadSound('assets/sounds/wrong.mp3');

  instructions = loadImage(`assets/images/instructions.png`);
  instructionsSayTheColour = loadImage(`assets/images/instructionsSayTheColour.png`);
  homeBackground = loadImage(`assets/images/homeBackground.jpg`);

  buttonPushTheEquations = loadImage(`assets/images/buttons/buttonPushTheEquations.png`);
  buttonSayTheColour = loadImage(`assets/images/buttons/buttonSayTheColour.png`);
  buttonMemory = loadImage(`assets/images/buttons/buttonMemory.png`);
  buttonSpeed = loadImage(`assets/images/buttons/buttonSpeed.png`);
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
Handles the two states of the program: loading, running
*/
function draw() {

  drawBackground();

  if (state === `loading`) {
    loading();
  } else if (state === `running`) {
    running();
  } else if (state === `title`) {
    title();
  } else if (state === `ending`) {
    ending();
  } else if (state === `titlePushEquations`) {
    titlePushEquations();
  } else if (state === `titleSayTheColour`) {
    titleSayTheColour();
  } else if (state === `runningSayTheColour`) {
    runningSayTheColour();
    displayScore();
  } else if (state === `titleMemory`) {
    titleMemory();
  } else if (state === `drawMemory`) {
    drawMemory();
  }

  // Draw notification is any.
  drawNotification();
}

function drawBackground() {
  background(255, 255, 255);
  push();
  image(homeBackground, 0, 0);
  pop();
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
Displays the main title screen with instructions.
*/
function title() {
  push();
  // textAlign(CENTER, CENTER);

  // Main title
  textFont(workSansBold);
  textSize(26);
  fill(255, 255, 255);
  text(`Selection Test for the`, 40, 70);
  textSize(36);
  fill(237, 75, 158);
  text(`Mars Exploration Program`, 40, 110);

  // Other text
  textFont(workSansRegular);
  textSize(18);
  fill(255, 255, 255);
  text(`A serie of tests will train your cognitive abilities!`, 40, 280);
  text(`At the end, we'll let you know if you can join the program!`, 40, 320);

  text(`Press A to play “Push the equations”
Press S to play “Say the colour”
Press D to play “Memory game”`, 40, 780);

  pop();

  image(buttonPushTheEquations, 40, 400);
  image(buttonSayTheColour, 340, 400);
  image(buttonMemory, 640, 400);
  image(buttonSpeed, 940, 400);
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
// Press any key to start the game.
function keyPressed() {

  // When in the title screen of each game, any key starts the game.
  // Switch to the running state.
  if (state === `titlePushEquations`) {
    state = `running`;
  }

  if (state === `titleSayTheColour`) {
    state = `runningSayTheColour`;
  }

  if (state === `titleMemory`) {
    initMemory();
    state = `drawMemory`;
  }

  // Temporary: When in the title screen, letters of the keyboard allow to access specific games.
  // A: Push pushTheEquations.
  // B: Say The Colour.
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
