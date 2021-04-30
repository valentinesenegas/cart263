"use strict";

/************************************************
         S E L E C T I O N   T E S T

                F O R   T H E

M A R S   E X P L O R A T I O N    P R O G R A M

************************************************/
/*
The mini games are:
- pushTheEquations
- sayTheColour
- memory game
- SuperFocus game
*/

/**
This game uses:

ml5.js Handpose:
https://learn.ml5js.org/#/reference/handpose

annyang:
https://www.talater.com/annyang/
*/

// /////////////////////////////// //
//              ASSETS
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

// Icons.
let iconPushTheEquations;
let iconSayTheColour;
let iconMemory;
let iconSpeed;

// Buttons.
let imgStartButtonReleased;
let imgStartButtonHover;
let imgStartButtonPressed;

let imgDoneButtonReleased;
let imgDoneButtonHover;
let imgDoneButtonPressed;

// /////////////////////////////// //

// Global notifications.
let notification = ``;
let notificationTTL = 0;

let notificationColourR;
let notificationColourG;
let notificationColourB;

// The global score is the sum of the scores of each mini game.
let globalScore;


// Preload the fonts, sounds and images.
function preload() {
  workSansRegular               = loadFont('assets/fonts/WorkSans-Regular.ttf');
  workSansBold                  = loadFont('assets/fonts/WorkSans-Bold.ttf');
  soundCorrect                  = loadSound('assets/sounds/correct.mp3');
  soundWrong                    = loadSound('assets/sounds/wrong.mp3');

  instructionsPushTheEquations  = loadImage(`assets/images/instructionsPushTheEquations.png`);
  instructionsSayTheColour      = loadImage(`assets/images/instructionsSayTheColour.png`);
  homeBackground                = loadImage(`assets/images/homeBackground.jpg`);
  gameBackground                = loadImage(`assets/images/gameBackground.jpg`);

  iconPushTheEquations          = loadImage(`assets/images/icons/iconPushTheEquations.png`);
  iconSayTheColour              = loadImage(`assets/images/icons/iconSayTheColour.png`);
  iconMemory                    = loadImage(`assets/images/icons/iconMemory.png`);
  iconSpeed                     = loadImage(`assets/images/icons/iconSpeed.png`);

  imgStartButtonReleased        = loadImage(`assets/images/buttons/buttonStartReleased.png`);
  imgStartButtonHover           = loadImage(`assets/images/buttons/buttonStartHover.png`);
  imgStartButtonPressed         = loadImage(`assets/images/buttons/buttonStartPressed.png`);

  imgDoneButtonReleased         = loadImage(`assets/images/buttons/buttonDoneReleased.png`);
  imgDoneButtonHover            = loadImage(`assets/images/buttons/buttonDoneHover.png`);
  imgDoneButtonPressed          = loadImage(`assets/images/buttons/buttonDonePressed.png`);
}

/**
Creates the canvas.
Starts the webcam and the Handpose model.
Creates the equation for the pushTheEquations game.
*/
function setup() {
  createCanvas(1440, 900);

  // Start webcam and hide the resulting HTML element
  video = createCapture(VIDEO);
  // video.size(width, height);
  video.hide();

  // Start the Handpose model and switch to the title state when it is loaded.
  handpose = ml5.handpose(video, {
    flipHorizontal: true
  }, function() {
    // Switch to the title state
    state = `title`;
  });

  // Listen for prediction events from Handpose and store the results in the
  // predictions array when they occur
  handpose.on(`predict`, function(results) {
    predictions = results;
  });

  // Create the first basic equation for the PushTheEquations game.
  equation = new Equation(1);
  equation.generate();
}

/**
Handles the states of the program.
Each game has a title and draw state and a function associated with each of those states.
*/
function draw() {

  drawGameBackground();

  if (state === `loading`) {
    drawHomeBackground();
    loading();
  } else if (state === `title`) {
    drawHomeBackground();
    title();
  } else if (state === `titlePushEquations`) {
    titlePushEquations();
  } else if (state === `drawPushEquations`) {
    drawPushEquations();
  } else if (state === `endingPushEquations`) {
    endingPushEquations();
  } else if (state === `titleSayTheColour`) {
    titleSayTheColour();
  } else if (state === `drawSayTheColour`) {
    drawSayTheColour();
  } else if (state === `titleMemory`) {
    titleMemory();
  } else if (state === `drawMemory`) {
    drawMemory();
  } else if (state === `titleSuperFocus`) {
    titleSuperFocus();
  } else if (state === `drawSuperFocus`) {
    drawSuperFocus();
  }

  // Draw notification if any.
  drawNotification();
}


// Backgrounds.
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
// Global Notifications. They can be used in all games.

// Parameters:
// - notificationText: the text that will appear in the notification.
// - The 3 last parameters are for the colour of the notification.
function setNotification(notificationText, colourR, colourG, colourB) {
  notification = notificationText;
  // Set the length of time during which the notification will be displayed.
  notificationTTL = 60;

  notificationColourR = colourR;
  notificationColourG = colourG;
  notificationColourB = colourB;
}

// Display a notification on screen for correct and incorrect guesses.
function drawNotification() {
  if (notification == '' || notificationTTL === 0)
    return;

  push();
  textFont(workSansBold);
  textSize(28);
  textAlign(CENTER, CENTER);
  fill(notificationColourR, notificationColourG, notificationColourB);
  textSize(20);
  text(notification, width / 2, 160);
  pop();

  // Manage when the notification will disappear.
  notificationTTL--;
  if (notificationTTL === 0)
    notification = '';
}

// ---------------------------- //

// Keyboard control.
function keyPressed() {

  // When in the title screen of each game, any key starts the game.
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
