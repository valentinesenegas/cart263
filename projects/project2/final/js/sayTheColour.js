"use strict";

/*************************************
Game: Say The Colour
The user has to say the colour of the word and not the word itself.
*************************************/

// Possible colours: their names and their RBG values.
const colourNames = [`yellow`, `orange`, `red`,  `pink`, `purple`, `blue`, `green`,  `white`];
const coloursR =    [242,       242,      235,    237,    127,       47,     39,       255];
const coloursG =    [201,       153,      87,     75,     81,       128,    174,      255];
const coloursB =    [76,        74,       87,     158,    224,      237,    96,       255];


// The current colour name the user is trying to guess.
let currentColour = ``;
let indexCurrentColour;

// The word displayed that the user should not say.
// I call it the "Colour trap".
let currentColourTrap = ``;
let indexTrap;

// The current answer given by the user.
let currentAnswer = ``;

let sayTheColourStarted = false;

// The score for this mini game.
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
  fill(255, 255, 255);
  textFont(workSansBold);
  textSize(24);
  textAlign(CENTER, CENTER);
  text(`Say out loud the colour of the words.`, width / 2, 60);
  textFont(workSansRegular);
  textSize(18);
  text(`Press any key to start.`, width / 2, height - 200);

  image(instructionsSayTheColour, width/2 - instructionsSayTheColour.width/2, 150);
  pop();
}

// When the game runs.
function drawSayTheColour() {

// If there is no current colour, generate a new one and a colour trap.
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
  // If annyang is available and the game is started.
  if (annyang && sayTheColourStarted && !annyangAlreadyStartedSayTheColour) {
    // Create the guessing command for this game.
    commandsSayTheColour = {
      '*colour': guessColour
    };
    // Setup annyang and start.
    annyang.start();
    annyang.addCommands(commandsSayTheColour);
    annyangAlreadyStartedSayTheColour = true;
  }
}

// The correct colour. (The colour of the text, but will not be written on screen.)
function generateColour() {
  // Get a random element from the colourNames array
indexCurrentColour = Math.floor(random(colourNames.length));
// console.log(`Index: ` + indexCurrentColour);

currentColour = colourNames[indexCurrentColour];
// console.log(`Current colour: `+ currentColour);
}

// The word that will be written, but it's a trap! This is not the correct colour.
function generateColourTrap() {
  // Get a random element from the colourNames array
  indexTrap = Math.floor(random(colourNames.length));
  console.log(`index trap: ` + indexTrap);

  currentColourTrap = colourNames[indexTrap];
  console.log(`Colour Trap: `+ currentColourTrap);
}

// Display the word and its colour in the center of the screen.
function displayColour() {
// If there is a colour to display
  if (currentColour != ``) {
    push();
    // This is the correct colour (The user should say this).
    fill(coloursR[indexCurrentColour], coloursG[indexCurrentColour], coloursB[indexCurrentColour]);
    textFont(workSansBold);
    textSize(38);
    textAlign(CENTER, CENTER);
    // This (text) is the colour trap.
    text(currentColourTrap, width / 2, height/2);
    pop();
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

// Function that is called when the user guesses correctly.
function correctAnswerSayTheColour() {
  setNotification(`Correct`, 49, 208, 170);
  soundCorrect.play();

  if (!scoreSayTheColourIncremented) {
    scoreSayTheColour += 10;
    scoreSayTheColourIncremented = true;
    newRoundSayTheColour();
  }
}

// Function that is called when the user guesses correctly.
function incorrectAnswerSayTheColour() {
  setNotification(`Incorrect`, 235, 87, 87);
  soundWrong.play();
  newRoundSayTheColour();
}

// Triggers a new round. Compares the current round with the max rounds.
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

// Display the score of the current game.
function displayScoreSayTheColour() {
  push();
  textFont(workSansRegular);
  textSize(24);
  fill(237, 75, 158);
  text(`Score: ` + scoreSayTheColour, 15, 40);
  pop();
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
