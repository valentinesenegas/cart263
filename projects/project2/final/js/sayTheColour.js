"use strict";

/*************************************
Game: Say The Colour
The user has to say the colour of the word and not the word itself.
*************************************/

// Possible colours: their names and their RBG values.
const colourNames = [`yellow`, `orange`, `red`,  `pink`, `purple`, `blue`, `green`,  `black`];
const coloursR =    [242,       242,      235,    237,    75,       47,     39,       29];
const coloursG =    [201,       153,      87,     75,     77,       128,    174,      29];
const coloursB =    [76,        74,       87,     158,    237,      237,    96,       29];


// The current colour name the user is trying to guess.
let currentColour = ``;
let indexCurrentColour;

// The word displayed that the user should not say.
// I call it the "Colour trap".
let currentColourTrap = ``;
let indexTrap;

// The current answer given by the user.
let currentAnswer = ``;

let notification = ``;
let notificationTTL = 0;

let sayTheColourStarted = false;

// The number of correct answers for this mini game.
let scoreSayTheColour = 0;
let scoreSayTheColourIncremented = false;

// Number of rounds the user has to play.
let roundMaxSayTheColour = 10;
// Current round.
let roundSayTheColour = 0;

let annyangAlreadyStartedSayTheColour = false;

let commandsSayTheColour;


// TITLE
// Title screen for the game. Contains instructions.
function titleSayTheColour() {
  push();
  fill(74, 74, 104);
  textFont(workSansRegular);
  textSize(24);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(`Say out loud the colour of the words.`, width / 2, 60);

  textSize(18);
  text(`Press any key to start.`, width / 2, height - 200);

  image(instructionsSayTheColour, width/2 - instructionsSayTheColour.width/2, 150);
  pop();
}

// When the game runs.
function drawSayTheColour() {

// If there is no current colour
  if (currentColour === ``) {
      generateColour();
      generateColourTrap();
  }

  // Displays the colour at the center of the screen.
  displayColour();

  sayTheColourStarted = true;
  // Voice recognition
  startAnnyang();

  displayScoreSayTheColour();
}

// Create the commands for annyang.
function startAnnyang() {
  // Is annyang available?
  if (annyang && sayTheColourStarted && !annyangAlreadyStartedSayTheColour) {
    // Create the guessing command
    commandsSayTheColour = {
      '*colour': guessColour
    };
    // Setup annyang and start
    annyang.start();
    annyang.addCommands(commandsSayTheColour);
    console.log(`annyang started`);
    annyangAlreadyStartedSayTheColour = true;
  }
}

// The correct colour. The color of the text, but will not be written on screen.
function generateColour() {
  // Get a random element from the colourNames array

indexCurrentColour = Math.floor(random(colourNames.length));
console.log(`index: ` + indexCurrentColour);

currentColour = colourNames[indexCurrentColour];
console.log(`current colour: `+ currentColour);
}

// The word that will be written, but it's a trap! This is not the correct colour.
function generateColourTrap() {
  // Get a random element from the colourNames array

indexTrap = Math.floor(random(colourNames.length));
console.log(`index trap: ` + indexTrap);

currentColourTrap = colourNames[indexTrap];
console.log(`Colour Trap: `+ currentColourTrap);

// Math.floor(colours.length)
}


function displayColour() {
// If there is a colour to display
  if (currentColour != ``) {
    push();
    // This is the correct colour (The user should say this)
    fill(coloursR[indexCurrentColour], coloursG[indexCurrentColour], coloursB[indexCurrentColour]);
    textFont(workSansBold);
    textSize(38);
    textAlign(CENTER, CENTER);
    // This is the colour trap.
    text(currentColourTrap, width / 2, height/2);
    pop();
  }
}

/**
Display the current answer in red if incorrect and green if correct
(Displays nothing if no guess entered yet)
*/
function displayAnswer() {
  if (sayTheColourStarted && currentAnswer != ``) {
    if (currentAnswer === currentColour) {
      correctAnswerSayTheColour();
    } else {
      incorrectAnswerSayTheColour();
    }
    text(currentAnswer, width / 2, height / 2);
    incrementNbAnswers();
  }
}


// Verifies if the given answer is correct or not.
function guessColour(colour) {

  currentAnswer = colour;
  console.log(currentAnswer);

  if (sayTheColourStarted && currentAnswer != ``) {
    if (currentAnswer.toLowerCase() === currentColour) {
      correctAnswerSayTheColour();
      console.log(`correct`);
      resetColour();
    } else {
      incorrectAnswerSayTheColour();
      console.log(`incorrect`);
      resetColour();
    }
  }
}


/**
Function that is called when the user guesses correctly.
*/
function correctAnswerSayTheColour() {
  setNotification(`Correct`);
  soundCorrect.play();

  if (!scoreSayTheColourIncremented) {
    scoreSayTheColour += 10;
    scoreSayTheColourIncremented = true;
    newRoundSayTheColour();
  }
}

/**
Function that is called when the user guesses correctly.
*/
function incorrectAnswerSayTheColour() {
  setNotification(`Incorrect`);
  soundWrong.play();
  newRoundSayTheColour();
}

// Trigger a new round. Compares the current round with the max rounds.
function newRoundSayTheColour() {
  roundSayTheColour++;
  // When the user has had reached the last round,
  // pause annyang and remove commands, and switch to the title state.
  if (roundSayTheColour === roundMaxSayTheColour) {
    roundSayTheColour = 0;
    annyang.pause();
    annyang.removeCommands();
    console.log(`annyang stopped`);
    sayTheColourStarted = false;
    state = `title`;
    annyangAlreadyStartedSayTheColour = false;
  }
}

// Display the number of correct answers.
function displayScoreSayTheColour() {
  push();
  textFont(workSansRegular);
  textSize(24);
  fill(237, 75, 158);
  text(`Score: ` + scoreSayTheColour, 15, 40);
  pop();
}

// Set the length of time during which the notification will be displayed.
// In parameter, the text that will appear in the notification.
function setNotification(notificationText) {
  notification = notificationText;
  notificationTTL = 60;
}

// Display a notification on screen for correct and incorrect guesses.
function drawNotification() {
  if (notification == '' || notificationTTL === 0)
    return;

  push();
  textFont(workSansRegular);
  textSize(18);
  textAlign(CENTER, CENTER);
  fill(237, 87, 87);
  textSize(20);
  text(notification, width/2, 400);
  pop();
  notificationTTL--;
  if (notificationTTL === 0)
    notification = '';
}


// Reset the colour. Ready to be assigned a new one.
function resetColour() {
  // The current colour name the user is trying to guess.
  currentColour = ``;
  indexCurrentColour = null;

  // The colour of the word that is not necessarily the same.
  currentColourTrap = ``;
  indexTrap = null;

  scoreSayTheColourIncremented = false;
}
