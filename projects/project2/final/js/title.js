"use strict";

// Main Title page.

// Margins
let smallMargin = 8;
let mediumMargin = 16;
let bigMargin = 24;

// X and Y positions for the icons.
let iconX1 = 40;
let iconY1 = 200;

let iconX2 = 340;
let iconY2 = 540;

let iconW = 224;
let iconH = 224;

// Position and size of the Start button.
let startButtonX = [iconX1 + iconW/4,
                    iconX1 + iconW/4,
                    iconX2 + iconW/4,
                    iconX2 + iconW/4];
let startButtonY = [iconY1 + iconH + mediumMargin,
                    iconY2 + iconH + mediumMargin,
                    iconY1 + iconH + mediumMargin,
                    iconY2 + iconH + mediumMargin] ;
let startButtonW = 102;
let startButtonH = 48;
let imgLastStartButton = [null, null, null, null];

// Scoreboard
let scoreBoardX = 800;
let scoreBoardY = iconY2;
let scoreBoardW = 350;
let scoreBoardH = 220;
let borderRadius = 10;

let scoreboardNames = [`Fred`, `Val`, `Clau`];
let scoreboardScores = [290, 210, 160];
let lastPlayerScorePosition = -1;


//---- TITLE ----//
/**
Displays the main title screen with instructions, icons for each game and the scoreboard.
*/
function title() {
  push();

  // Main title: Selection Test for the Mars Exploration Program.
  textAlign(LEFT);
  textFont(workSansBold);
  textSize(36);
  fill(255, 255, 255);
  text(`Selection Test for the`, 40, 70);
  textSize(60);
  fill(237, 75, 158);
  text(`Mars Exploration Program`, 40, 140);

  // Presentation / instructions.
  textFont(workSansRegular);
  textSize(24);
  fill(255, 255, 255);
  text(`A serie of games will test your cognitive abilities!`, 600, 260);
  text(`At the end, you will know your cognitive score and you will
be able to compare it with other candidates!`, 600, 300);

  pop();

  drawIconsAndButtons();

  drawScoreboard();

  calculateGlobalScore();
}

// The icons and Start Button for each game.
function drawIconsAndButtons() {
  let button;
  let pressedButton = -1;

  push();
  textAlign(CENTER);

  for (button = 0; button < startButtonX.length; button++) {
    // Management of the different states of the button (released, hover and pressed).
    let imgStartButton = imgStartButtonReleased;

    if (mouseX >= startButtonX[button] && mouseX <= startButtonX[button] + startButtonW &&
        mouseY >= startButtonY[button] && mouseY <= startButtonY[button] + startButtonH) {
      if (mouseIsPressed) {
        imgStartButton = imgStartButtonPressed;
        pressedButton = button;
      }
      else if (imgLastStartButton != imgStartButtonPressed)
        imgStartButton = imgStartButtonHover;
    }
    imgLastStartButton[button] = imgStartButton;
    image(imgStartButton, startButtonX[button], startButtonY[button]);
  }

  // Icons and start buttons.
  image(iconPushTheEquations, iconX1, iconY1);

  textFont(workSansRegular);
  fill(255, 255, 255);
  textSize(18);
  if (scorePushTheEquations === 0)
    text(`Last score: none`, iconX1 + iconW/2, iconY1 + iconH + 82);
  else
    text(`Last score: ` + scorePushTheEquations, iconX1 + iconW/2, iconY1 + iconH + 82);

  image(iconSayTheColour, iconX1, iconY2);
  if (scoreSayTheColour === 0)
    text(`Last score: none`, iconX1 + iconW/2, iconY2 + iconH + 82);
  else
    text(`Last score: ` + scoreSayTheColour, iconX1 + iconW/2, iconY2 + iconH + 82);

  image(iconMemory, iconX2, iconY1);
  if (scoreMemory === 0)
    text(`Last score: none`, iconX2 + iconW/2, iconY1 + iconH + 82);
  else
    text(`Last score: ` + scoreMemory, iconX2 + iconW/2, iconY1 + iconH + 82);

  image(iconSpeed, iconX2, iconY2);
  if (scoreSuperFocus === 0)
    text(`Last score: none`, iconX2 + iconW/2, iconY2 + iconH + 82);
  else
    text(`Last score: ` + scoreSuperFocus, iconX2 + iconW/2, iconY2 + iconH + 82);
  pop();

  // Start game?
  let games = [`titlePushEquations`, `titleSayTheColour`, `titleMemory`, `titleSuperFocus`]
  if (pressedButton != -1)
      state = games[pressedButton];
}

function drawScoreboard() {
  // Scoreboard: Background.
  push();
  stroke('rgba(255,255,255,0.25)');
  strokeWeight(8);
  fill('rgba(255,255,255, 0.85)');
  rect(scoreBoardX, scoreBoardY, scoreBoardW, scoreBoardH, borderRadius, borderRadius, borderRadius, borderRadius);
  pop();

  // Scoreboard: Labels.
  push();
  textFont(workSansRegular);
  textSize(24);
  fill(75, 77, 237);
  text(`Candidates`, scoreBoardX + mediumMargin, scoreBoardY + bigMargin);
  text(`Global Score`, scoreBoardX + scoreBoardW * 0.55, scoreBoardY + bigMargin);
  pop();

  // Line
  push();
  stroke(75, 77, 237);
  strokeWeight(2.5);
  line(scoreBoardX, scoreBoardY + bigMargin + smallMargin, scoreBoardX + scoreBoardW, scoreBoardY + bigMargin + smallMargin);
  pop();

  // Scoreboard: Data.
  push();
  textFont(workSansRegular);
  textSize(20);
  for (let name = 0; name < scoreboardNames.length; name++) {
    fill(75, 77, 237);
    textAlign(LEFT);
    text(scoreboardNames[name], scoreBoardX + mediumMargin, scoreBoardY + (3 + name) * bigMargin);
    textAlign(RIGHT);
    text(scoreboardScores[name], scoreBoardX + scoreBoardW * 0.93, scoreBoardY + (3 + name) * bigMargin);
  }

    textAlign(CENTER);
    fill(255, 255, 255);
    text(`Maximum possible score: 390`, scoreBoardX + scoreBoardW/2 , scoreBoardY + scoreBoardH + bigMargin);
  pop();
}

function insertPlayerScore(name, score) {
  let player;
  if (lastPlayerScorePosition != -1) {
    scoreboardNames.splice(lastPlayerScorePosition, 1);
    scoreboardScores.splice(lastPlayerScorePosition, 1);
  }

  // Loop on all players and insert new score at the right position.
  for (player = 0 ; player < scoreboardNames.length; player++) {
    if (score > scoreboardScores[player])
      break;
  }

  // Insert name/score of player at the right position.
  lastPlayerScorePosition = player;
  scoreboardNames.splice(player, 0, name);
  scoreboardScores.splice(player, 0, score);
}

function calculateGlobalScore() {
  if (scorePushTheEquations != 0 || scoreSayTheColour != 0 || scoreMemory != 0 || scoreSuperFocus != 0) {
    globalScore = (scorePushTheEquations + scoreSayTheColour + scoreMemory + scoreSuperFocus);
    insertPlayerScore(`You`, Math.floor(globalScore));
  }
}


//---- LOADING ----//
/**
Displays a simple loading screen with the loading model's name.
*/
function loading() {
  push();
  textFont(workSansRegular);
  textSize(24);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  fill(255, 255, 255);
  text(`Loading ${modelName}...`, width / 2, 800);
  pop();
}
