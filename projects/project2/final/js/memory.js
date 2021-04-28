"use strict";

// Game: Memory

// Try to remember the words that will appear on screen.
// You will be asked to repeat them.

// Pool of possible words.
let pool = [`music`, `philosophy`, `income`, `garbage`, `priority`, `clothes`,
  `government`, `customer`, `interaction`, `expression`, `appearance`, `art`, `lake`,
  `orange`, `signature`, `activity`, `obligation`, `discussion`, `two`, `height`,
  `classroom`, `education`, `language`, `introduction`, `shopping`, `recognition`,
  `ear`, `menu`, `protection`, `meal`, `stranger`, `tooth`, `method`, `safety`,
  `anxiety`, `salad`, `area`, `hat`, `membership`, `version`, `consequence`, `queen`,
  `industry`, `paper`, `imagination`, `cookie`, `baseball`, `mode`, `emotion`, `ambition`,
  `heart`, `map`, `patience`, `environment`, `town`, `trainer`, `potato`, `player`, `homework`];

// List of selected words that will be presented to the user.
let selectedWords = [];

let numberOfSelectedWords = 9;

let displayAllWordsTTL = 60 * 5; // 60 fps x 5 seconds

// TITLE
// Title screen for the game. Contains instructions.
function titleMemory() {
  push();
  fill(74, 74, 104);
  textFont(workSansRegular);
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(`Try to remember the words that will appear on screen.`, width / 2, height/2);
  text(`You will be asked to repeat them shortly after.`, width / 2, height/2 + 60);

  textSize(18);
  text(`Press any key to start.`, width / 2, 800);
  pop();
}

function isWordAlreadySelected(numberOfWordsAlreadySelected, candidate) {
  for (let word = 0; word < numberOfWordsAlreadySelected; word++)
    if (selectedWords[word] === candidate)
      return true;
  return false;
}

// Select random words from the pool of possible words.
function initMemory() {

  for (let word = 0; word < numberOfSelectedWords; word++) {
    let candidate;
    do
      candidate = Math.floor(random(pool.length));
    while (isWordAlreadySelected(word, candidate));
    selectedWords[word] = candidate;
  }
}

function drawMemory() {

  displayAllWords();
  listenToUser();
}

// Display the words at the beginning.
function displayAllWords() {
  if (displayAllWordsTTL != 0)
    displayAllWordsTTL--;
  push();
  fill(74, 74, 104);
  textFont(workSansRegular);
  textSize(18);
  textAlign(CENTER, CENTER);
  for (let y = 0; y < 3; y++)
    for (let x = 0; x < 3; x++)
      if (displayAllWordsTTL != 0)
        text(pool[selectedWords[x + y * 3]], (x + 1) * width / 4, (y + 1) * height / 4 );
  pop();
}

function listenToUser() {

    // Is annyang available?
    if (annyang) {
      // Create the guessing command
      let commands = {
        '*word': guessWord
      };
      // Setup annyang and start
      annyang.addCommands(commands);
      annyang.start();
    }
}


// Verifies if the given answer is correct or not.
function guessWord(guessedWord) {

  currentAnswer = guessedWord;
  console.log(currentAnswer);

  if (gameStarted && currentAnswer != ``) {
    if (currentAnswer.toLowerCase() === currentColour) {
      correctGuessWord();
      console.log(`correct`);
    } else {
      incorrectGuessWord();
      console.log(`incorrect`);
    }
    // text(currentAnswer, width / 2, height / 2);
    // incrementNbAnswers();
  }
}


/**
Function that is called when the user guesses correctly.
*/
function correctGuessWord() {
  setNotification(`Correct`);

  if (!nbCorrectAnwersIncremented) {
    incrementScore();
    nbCorrectAnswers += 1;
    nbCorrectAnwersIncremented = true;
  }
}

/**
Function that is called when the user guesses correctly.
*/
function incorrectGuessWord() {
  setNotification(`Incorrect`);

  if (!nbIncorrectAnwersIncremented) {
    decrementScore();
    nbIncorrectAnswers += 1;
    nbIncorrectAnwersIncremented = true;
  }
}
