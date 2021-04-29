"use strict";

/*************************************
Game: Memory
The user has to remember the words that will appear on screen for a few seconds.
The user will be asked to repeat them after.
*************************************/

// Pool of possible words.
let pool = [`music`, `philosophy`, `income`, `garbage`, `priority`, `clothes`,
  `government`, `customer`, `interaction`, `expression`, `appearance`, `art`, `lake`,
  `orange`, `signature`, `activity`, `obligation`, `discussion`, `height`,
  `classroom`, `education`, `language`, `introduction`, `shopping`, `recognition`,
  `ear`, `menu`, `protection`, `meal`, `stranger`, `tooth`, `method`, `safety`,
  `anxiety`, `salad`, `area`, `hat`, `membership`, `version`, `consequence`, `queen`,
  `industry`, `paper`, `imagination`, `cookie`, `baseball`, `mode`, `emotion`, `ambition`,
  `heart`, `map`, `patience`, `environment`, `town`, `trainer`, `potato`, `player`,
  `homework`, `alien`, `space`, `astronaut`, `mars`, `planet`, `exploration`, `galaxy`,
  `comet`, `astronomy`, `star`, `solar system`, `telescope`, `moon`, `satellite`
];

// List of selected words that will be presented to the user.
let selectedWords = [];

// Words found by the user.
let foundWords = [];

// Number of words that are randomly selected and that will be displayed on the screen.
let numberOfSelectedWords = 9;

// Countdown.
let displayAllWordsTTL;
let displayAllWordsTTLMax = 60 * 5; // 60 fps x 5 seconds

// Display the countdown in a horizontal bar.
let rectangleTimeLeftX = 0;
let rectangleTimeLeftY;
let rectangleTimeLeftW;
let rectangleTimeLeftH = 30;

// The score for this mini game.
let scoreMemory = 0;

// Done button: when the user said all the words they remembered, they click on it.
let imgDoneButton;
let imgLastDoneButton;
let doneButtonW = 133;
let doneButtonH = 48;
let doneButtonX = 1440 / 2 - doneButtonW / 2;
let doneButtonY = 800;

let commandsMemory;
let annyangAlreadyStartedMemory = false;

// TITLE
// Title screen for the game. Contains instructions.
function titleMemory() {
  push();
  fill(74, 74, 104);
  textFont(workSansRegular);
  textSize(24);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(`Try to remember the words that will appear on screen.`, width / 2, height / 2);
  text(`You will be asked to repeat them shortly after.`, width / 2, height / 2 + 60);

  textSize(18);
  text(`Press any key to start.`, width / 2, height - 200);
  pop();
}

// To create the array of selected words, verify if the candidate word is already in the array.
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
    foundWords[word] = false;
    displayAllWordsTTL = displayAllWordsTTLMax;
  }
}

// Display the words and the score.
function drawMemory() {
  displayAllWords();
  displayScoreMemory();
}

// Display the words to remember.
function displayAllWords() {
  push();
  noStroke();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textFont(workSansRegular);

  if (displayAllWordsTTL == 1)
    startAnnyangMemory();
  if (displayAllWordsTTL != 0)
    displayAllWordsTTL--;

  // Table with 9 cells.
  for (let y = 0; y < 3; y++)
    for (let x = 0; x < 3; x++) {
      let word = x + y * 3;

      // Rectangles underneath the words.
      fill(140, 140, 161);
      rect((x + 1) * width / 4, (y + 1) * height / 4, 300, 100, borderRadius, borderRadius, borderRadius, borderRadius);

      // Display the words if the time is not up.
      if (displayAllWordsTTL != 0) {
        textSize(22);
        fill(255, 255, 255);
        text(pool[selectedWords[word]], (x + 1) * width / 4, (y + 1) * height / 4);

        displayTimeLeft();
      } else {
        textSize(32);
        fill(140, 140, 161);
        text(`Say out loud the words you remember.`, width / 2, 100);

        // Display words already found.
        textSize(22);
        fill(255, 255, 255);
        if (foundWords[word] === true)
          text(pool[selectedWords[word]], (x + 1) * width / 4, (y + 1) * height / 4);

        // Management of the different states of the button (released, hover and pressed).
        let imgDoneButton = imgDoneButtonReleased;

        if (mouseX >= doneButtonX && mouseX <= doneButtonX + doneButtonW &&
          mouseY >= doneButtonY && mouseY <= doneButtonY + doneButtonH) {
          if (mouseIsPressed) { // When the user clicks on the button
            imgDoneButton = imgDoneButtonPressed;
            // When the user has had reached the last round,
            // pause annyang and remove commands, and switch to the title state.
            state = `title`;
            annyang.removeCommands();
            annyang.pause();
            console.log(`annyang paused`);
            annyangAlreadyStartedMemory = false;
          } else if (imgLastDoneButton != imgDoneButtonPressed)
            imgDoneButton = imgDoneButtonHover;
        }
        imgLastDoneButton = imgDoneButton;
        image(imgDoneButton, doneButtonX, doneButtonY);
      }
    }

  pop();
}

// Display the time left with the words appearing on the screen.
// It is displayed in a horizontal bar. Its width decreases.
function displayTimeLeft() {
  push();
  rectMode(CORNER);
  rectangleTimeLeftW = map(displayAllWordsTTL, 0, displayAllWordsTTLMax, 0, width);
  rectangleTimeLeftY = height - rectangleTimeLeftH;
  fill(74, 74, 104);
  rect(rectangleTimeLeftX, rectangleTimeLeftY, rectangleTimeLeftW, rectangleTimeLeftH);
  pop();
}

// Create the commands for annyang.
function startAnnyangMemory() {
  // Is annyang available?
  if (annyang && !annyangAlreadyStartedMemory) {
    // Create the guessing command
    commandsMemory = {
      '*word': guessWord
    };
    // Setup annyang and start
    annyang.addCommands(commandsMemory);
    annyang.start();
    console.log(`annyang started`);
    annyangAlreadyStartedMemory = true;
  }
}

// Verifies if the given answer is correct or not.
function guessWord(guessedWord) {

  currentAnswer = guessedWord;
  console.log(currentAnswer);

  if (currentAnswer != ``) {
    let indexWord;
    for (indexWord = 0; indexWord < selectedWords.length; indexWord++) {
      if (currentAnswer.toLowerCase() === pool[selectedWords[indexWord]]) {
        foundWords[indexWord] = true;
        correctGuessWord();
        console.log(`correct`);
        soundCorrect.play();
        break;
      }
    }

    if (indexWord === selectedWords.length) {
      incorrectGuessWord();
      soundWrong.play();
      console.log(`incorrect`);
    }
  }
}

//Function that is called when the user guesses correctly.
function correctGuessWord() {
  setNotification(`Correct`);
  scoreMemory += 10;
}

//Function that is called when the user guesses correctly.
function incorrectGuessWord() {
  setNotification(`Incorrect`);
}

// Display the number of correct answers.
function displayScoreMemory() {
  push();
  textFont(workSansRegular);
  textAlign(LEFT);
  textSize(24);
  fill(237, 75, 158);
  text(`Score: ` + scoreMemory, 15, 40);
  pop();
}
